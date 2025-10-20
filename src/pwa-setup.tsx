import { useEffect } from "react";
import { toast } from "sonner";
import { useNetworkStatus } from "./context/network-context";
import { subscribeAndRegisterPush } from "./lib/push";
import { env } from "./env";
import { useIsMobile } from "./hooks/use-mobile";

export function PendingExampleSyncNotifier() {
  const { isOnline } = useNetworkStatus();

  useEffect(() => {
    if (!isOnline) return;

    const rawCount = localStorage.getItem('@bncc-comp:pending-example-count');
    const count = rawCount ? parseInt(rawCount, 10) : 0;

    if (count > 0) {
      const message = count === 1
        ? 'Contribuição enviada com sucesso'
        : `${count} contribuições enviadas com sucesso`;
      toast.success(message);
      localStorage.removeItem('@bncc-comp:pending-example-count');
      localStorage.removeItem('@bncc-comp:pending-example-submission');
      return;
    }

    if (localStorage.getItem('@bncc-comp:pending-example-submission') === '1') {
      toast.success('Contribuição enviada com sucesso');
      localStorage.removeItem('@bncc-comp:pending-example-submission');
    }
  }, [isOnline]);

  return null;
}

export function PendingEvaluationSyncNotifier() {
  const { isOnline } = useNetworkStatus();

  useEffect(() => {
    if (!isOnline) return;

    const rawCount = localStorage.getItem('@bncc-comp:pending-evaluation-count');
    const count = rawCount ? parseInt(rawCount, 10) : 0;

    if (count > 0) {
      const message = count === 1
        ? 'Avaliação enviada com sucesso'
        : `${count} avaliações enviadas com sucesso`;
      toast.success(message);
      localStorage.removeItem('@bncc-comp:pending-evaluation-count');
      localStorage.removeItem('@bncc-comp:pending-evaluation-submission');
      return;
    }

    if (localStorage.getItem('@bncc-comp:pending-evaluation-submission') === '1') {
      toast.success('Avaliação enviada com sucesso');
      localStorage.removeItem('@bncc-comp:pending-evaluation-submission');
    }
  }, [isOnline]);

  return null;
}

export function PushNotificationsSetup() {
  async function ensureSubscription() {
    const isStandalone = window.matchMedia?.('(display-mode: standalone)')?.matches
      || (navigator as any).standalone === true
    if (!isStandalone) return;

    if (!('Notification' in window) || Notification.permission === 'denied') return;
    if (Notification.permission === 'default') {
      const alreadyAsked = localStorage.getItem('push:permission-asked') === '1'
      if (alreadyAsked) return;
      const perm = await Notification.requestPermission();
      localStorage.setItem('push:permission-asked', '1')
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

export function PersistentStorageSetup() {
  useEffect(() => {
    (async () => {
      if (!('storage' in navigator) || !('persist' in navigator.storage)) return
      const already = await navigator.storage.persisted()
      if (already) return
      try {
        const granted = await navigator.storage.persist()
        if (!granted) {
          console.warn('Armazenamento persistente não concedido')
        } else {
          console.log('Armazenamento persistente concedido')
        }
      } catch (e) {
        console.error('Falha ao solicitar armazenamento persistente', e)
      }
    })()
  }, [])
  return null
}

export function PwaInstallPrompt() {
  const isMobile = useIsMobile()

  useEffect(() => {
    if (!isMobile) return

    const isStandalone = window.matchMedia?.('(display-mode: standalone)')?.matches
      || (navigator as any).standalone === true
      || localStorage.getItem('@bncc-comp:pwa-installed') === '1'

    if (isStandalone) {
      localStorage.setItem('@bncc-comp:pwa-installed', '1')
      return
    }

    const dismissed = localStorage.getItem('@bncc-comp:pwa-install-dismissed') === '1'
    if (dismissed) return

    let deferredPrompt: any = null

    const showInstallToast = () => {
      toast(
        'Instalar o aplicativo?',
        {
          id: 'pwa-install',
          description: 'Acesse mais rápido e use offline instalando o app.',
          position: 'top-center',
          action: {
            label: 'Instalar',
            onClick: async () => {
              try {
                await deferredPrompt?.prompt()
                const choice = await deferredPrompt?.userChoice
                if (choice?.outcome === 'accepted') {
                } else {
                  localStorage.setItem('@bncc-comp:pwa-install-dismissed', '1')
                }
              } catch {}
              toast.dismiss('pwa-install')
            }
          },
          duration: Number.POSITIVE_INFINITY,
          closeButton: true,
          onDismiss: () => {
            localStorage.setItem('@bncc-comp:pwa-install-dismissed', '1')
          }
        }
      )
    }

    const onBeforeInstallPrompt = (e: any) => {
      e.preventDefault()
      deferredPrompt = e
      showInstallToast()
    }

    const onAppInstalled = () => {
      localStorage.setItem('@bncc-comp:pwa-installed', '1')
      toast.dismiss('pwa-install')
    }

    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt)
    window.addEventListener('appinstalled', onAppInstalled)

    const ua = navigator.userAgent.toLowerCase()
    const isIOS = /iphone|ipad|ipod/.test(ua)
    if (isIOS && !isStandalone && !dismissed) {
      setTimeout(() => {
        toast(
          'Instalar aplicativo',
          {
            id: 'pwa-install-ios',
            description: 'No Safari: Compartilhar → Adicionar à Tela de Início.',
            position: 'top-center',
            duration: Number.POSITIVE_INFINITY,
            closeButton: true,
            onDismiss: () => {
              localStorage.setItem('@bncc-comp:pwa-install-dismissed', '1')
            }
          }
        )
      }, 1500)
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt)
      window.removeEventListener('appinstalled', onAppInstalled)
    }
  }, [isMobile])

  return null
}