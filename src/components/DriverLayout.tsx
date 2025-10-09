import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DriverSidebar } from "@/components/DriverSidebar";
import { Menu } from "lucide-react";

interface DriverLayoutProps {
  children: React.ReactNode;
}

export function DriverLayout({ children }: DriverLayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full">
        <DriverSidebar />
        <div className="flex-1 flex flex-col w-full">
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
            <SidebarTrigger className="text-foreground hover:bg-accent transition-colors">
              <Menu className="h-5 w-5" />
            </SidebarTrigger>
          </header>
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
