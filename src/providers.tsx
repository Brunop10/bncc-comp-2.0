import { RouterProvider } from "react-router";
import { router } from "./router";
import { DataProvider } from "./contexts/data-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query";

export function Providers() {
  return (
    <QueryClientProvider client={queryClient}>
      <DataProvider>
        <RouterProvider router={router} />
      </DataProvider>
    </QueryClientProvider>
  )
}
