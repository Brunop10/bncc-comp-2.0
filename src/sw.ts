/* eslint-disable no-restricted-globals */
/// <reference lib="webworker" />
declare const self: ServiceWorkerGlobalScope;
export {};

import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, NetworkOnly, StaleWhileRevalidate } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { BackgroundSyncPlugin } from 'workbox-background-sync';

// Precaching gerado pelo build (auto-injetado pelo VitePWA)
precacheAndRoute((self as any).__WB_MANIFEST);

// Ativação imediata e assumir controle das abas
self.skipWaiting();
self.addEventListener('activate', (event: ExtendableEvent) => {
  event.waitUntil(self.clients.claim());
});

// Assets estáticos: cache-first
registerRoute(
  ({ request }: { request: Request }) =>
    ['image', 'style', 'script', 'font'].includes((request as any).destination),
  new CacheFirst({
    cacheName: 'assets-v1',
    plugins: [
      new ExpirationPlugin({ maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 30 }),
    ],
  })
);

// API GET: stale-while-revalidate para resposta imediata do cache
registerRoute(
  ({ url, request }: { url: URL; request: Request }) =>
    request.method === 'GET' && url.origin.includes('script.google.com'),
  new StaleWhileRevalidate({
    cacheName: 'api-v1',
    plugins: [
      new ExpirationPlugin({ maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 30 }),
    ],
  })
)

// Background Sync para POST offline
const addExampleQueue = new BackgroundSyncPlugin('add-example-queue', {
  maxRetentionTime: 24 * 60,
});

registerRoute(
  ({ url, request }: { url: URL; request: Request }) =>
    request.method === 'POST' && url.origin.includes('script.google.com'),
  new NetworkOnly({
    plugins: [addExampleQueue],
  }),
  'POST'
);

// Push: exibir notificação
self.addEventListener('push', (event: any) => {
  const data = (() => {
    try { return event.data?.json() } catch { return {} }
  })() || {}
  const title = data.title ?? 'Atualização'
  const body = data.body ?? 'Abra o app para ver novidades'
  const url = data.url

  event.waitUntil(
    (self as any).registration.showNotification(title, {
      body,
      data: { url },
    })
  )
});

// Clique na notificação: abrir/focar app
self.addEventListener('notificationclick', (event: any) => {
  const url = event.notification?.data?.url
  event.notification?.close()
  event.waitUntil((self as any).clients.openWindow(url || '/'))
});