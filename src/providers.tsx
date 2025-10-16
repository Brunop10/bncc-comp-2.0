import { RouterProvider } from "react-router";
import { router } from "./router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query";
import { Toaster } from "./components/ui/sonner";
import { NetworkProvider } from "./context/network-context";
import { PendingExampleSyncNotifier, PushNotificationsSetup, PersistentStorageSetup, PwaInstallPrompt } from "./pwa-setup";
import { AppEvaluationProvider } from "./app-evaluation/context";
import { AppEvaluationBootstrap } from "./app-evaluation/bootstrap";
import { AppEvaluationOverlay } from "./app-evaluation/overlay";
import { AppEvaluationRating } from "./app-evaluation/rating";
import { AppEvaluationHud } from "./app-evaluation/hud";
import { AppEvaluationFinish } from "./app-evaluation/finish";

 
export function Providers() {
  return (
    <>
      <AppEvaluationProvider>
        <QueryClientProvider client={queryClient}>
          <NetworkProvider>
            <Toaster richColors theme="light" position="bottom-center" closeButton />
            <AppEvaluationBootstrap />
            <RouterProvider router={router} />
            <AppEvaluationOverlay />
            <AppEvaluationRating />
            <AppEvaluationFinish />
            <AppEvaluationHud />
            <PendingExampleSyncNotifier />
          </NetworkProvider>
        </QueryClientProvider>
      </AppEvaluationProvider>
      <PushNotificationsSetup />
      <PersistentStorageSetup />
      <PwaInstallPrompt />
    </>
  )
}
