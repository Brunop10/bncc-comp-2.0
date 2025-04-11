import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Outlet } from "react-router"
import { Header } from "@/components/header"
import { useIsMobile } from "@/hooks/use-mobile"

export default function Layout() {
  const isMobile = useIsMobile()

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        {isMobile && <Header />}
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
