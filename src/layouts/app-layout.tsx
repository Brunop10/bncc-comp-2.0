import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Outlet, useLocation } from "react-router"
import { Header } from "@/components/header"
import { useEffect } from "react"
import { useNetworkStatus } from "@/context/network-context"
import { OfflineBanner } from "@/components/offline-banner"

export default function Layout() {
  const location = useLocation()
  const { isOnline } = useNetworkStatus()

  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
  }, [location.pathname])

  return (
    <SidebarProvider>
      {/* <AppSidebar variant="inset" /> */}
      <SidebarInset>
        {<Header />}
        {!isOnline && (
            <div className="sticky top-0 z-50 mx-2 mt-2 md:mx-auto md:max-w-lg">
              <OfflineBanner />
            </div>
          )}
        <div className="flex flex-1 flex-col bg-gray-50">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex w-full px-8 md:px-0 md:max-w-lg mx-auto flex-col gap-4 py-4 md:gap-6 md:py-6">
              <Outlet />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
