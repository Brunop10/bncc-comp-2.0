import { RouterProvider } from "react-router";
import { router } from "./router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query";
import { Toaster } from "./components/ui/sonner";
import { NetworkProvider } from "./context/network-context";


export function Providers() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <NetworkProvider>
          <RouterProvider router={router} />
        </NetworkProvider>
      </QueryClientProvider>
      <Toaster richColors theme="light" />
    </>
  )
}
