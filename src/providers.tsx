import { RouterProvider } from "react-router";
import { router } from "./router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query";
import { Toaster } from "./components/ui/sonner";
import { NetworkProvider, useNetworkStatus } from "./context/network-context";
import { useEffect } from "react";
import { toast } from "sonner";


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
    </>
  )
}
