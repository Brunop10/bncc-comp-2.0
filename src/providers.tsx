import { RouterProvider } from "react-router";
import { router } from "./router";
import { DataProvider } from "./contexts/data-provider";

export function Providers() {
  return (
    <DataProvider>
      <RouterProvider router={router} />
    </DataProvider>
  )
}
