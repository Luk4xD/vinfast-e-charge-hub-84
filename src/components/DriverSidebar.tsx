import { Home, Car, MapPin, Calendar, History, Battery, CreditCard, Settings, LogOut, PanelLeftClose, PanelLeft } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AccountSettings from "@/components/AccountSettings";

const mainItems = [
  { title: "Dashboard", url: "/driver", icon: Home },
  { title: "Đăng ký xe", url: "/driver/register-vehicle", icon: Car },
  { title: "Tìm trạm", url: "/driver/find-stations", icon: MapPin },
  { title: "Đặt lịch", url: "/driver/reservation", icon: Calendar },
  { title: "Lịch sử", url: "/driver/booking-history", icon: History },
  { title: "Gói thuê pin", url: "/driver/subscriptions", icon: Battery },
  { title: "Thanh toán", url: "/driver/payment", icon: CreditCard },
];

export function DriverSidebar() {
  const { open, toggleSidebar } = useSidebar();
  const navigate = useNavigate();
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <>
      <Sidebar
        className={`transition-all duration-300 ${
          open ? "w-64" : "w-20"
        }`}
        collapsible="icon"
      >
        <div className="h-full bg-white dark:bg-slate-900 m-3 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg">
          <SidebarHeader className="border-b border-slate-200 dark:border-slate-700 p-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
            >
              {open ? <PanelLeftClose className="h-5 w-5" /> : <PanelLeft className="h-5 w-5" />}
            </Button>
          </SidebarHeader>
          
          <SidebarContent className="pt-4">
            <SidebarGroup>
              <SidebarGroupLabel className={`text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider px-3 mb-2 ${!open && "opacity-0"}`}>
                Menu chính
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {mainItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        tooltip={item.title}
                        className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 data-[active=true]:bg-blue-100 dark:data-[active=true]:bg-blue-900/50 data-[active=true]:text-blue-600 dark:data-[active=true]:text-blue-400 transition-all duration-200"
                      >
                        <NavLink to={item.url} end={item.url === "/driver"}>
                          <item.icon className="h-5 w-5 shrink-0" />
                          {open && <span className="animate-fade-in">{item.title}</span>}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-slate-200 dark:border-slate-700 p-2 mt-auto">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setSettingsOpen(true)}
                  tooltip="Cài đặt"
                  className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-all duration-200 cursor-pointer"
                >
                  <Settings className="h-5 w-5 shrink-0" />
                  {open && <span className="animate-fade-in">Cài đặt</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={handleLogout}
                  tooltip="Đăng xuất"
                  className="text-slate-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 transition-all duration-200 cursor-pointer"
                >
                  <LogOut className="h-5 w-5 shrink-0" />
                  {open && <span className="animate-fade-in">Đăng xuất</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </div>
      </Sidebar>

      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Cài đặt tài khoản</DialogTitle>
          </DialogHeader>
          <AccountSettings userRole="driver" />
        </DialogContent>
      </Dialog>
    </>
  );
}
