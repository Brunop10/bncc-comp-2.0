import { RouterProvider } from "react-router";
import { router } from "./router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query";
import { Toaster } from "./components/ui/sonner";
import { NetworkProvider, useNetworkStatus } from "./context/network-context";
import { useEffect } from "react";
import { toast } from "sonner";
import { subscribeAndRegisterPush } from './lib/push'
import { env } from './env'

function PendingExampleSyncNotifier() {
  const { isOnline } = useNetworkStatus();

  useEffect(() => {
    if (isOnline && localStorage.getItem('@bncc-comp:pending-example-submission') === '1') {
      toast.success('Exemplo pendente foi enviado com sucesso');
      localStorage.removeItem('@bncc-comp:pending-example-submission');
    }
  }, [isOnline]);

  return null;
}

function PushNotificationsSetup() {
  async function ensureSubscription() {
    if (!('Notification' in window) || Notification.permission === 'denied') return;
    if (Notification.permission === 'default') {
      const perm = await Notification.requestPermission();
      if (perm !== 'granted') return;
    }

    const reg = await navigator.serviceWorker.ready;
    const existing = await reg.pushManager.getSubscription();
    if (existing) {
      const json = existing.toJSON();
      localStorage.setItem('push:subscription', JSON.stringify(json));
      console.log('Push subscription (existente):', json);
      return;
    }

    const publicKey = env.VITE_PUSH_PUBLIC_KEY;
    if (!publicKey) {
      console.warn('VITE_PUSH_PUBLIC_KEY ausente. Defina no .env para assinar o Push.');
      return;
    }

    const subscription = await subscribeAndRegisterPush(reg, publicKey);
    console.log('Push subscription (nova):', subscription.toJSON?.() ?? subscription);
  }

  useEffect(() => {
    ensureSubscription().catch(console.error);
  }, []);

  return null;
}

export function Providers() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <NetworkProvider>
          <PendingExampleSyncNotifier />
          <RouterProvider router={router} />
        </NetworkProvider>
      </QueryClientProvider>
      <Toaster richColors theme="light" />
      <PushNotificationsSetup />
    </>
  )
}
