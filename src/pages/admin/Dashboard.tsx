import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BarChart3, TrendingUp, Users, Battery, MapPin, Home, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import AccountSettings from "@/components/AccountSettings";

const AdminDashboard = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Modern Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BarChart3 className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-semibold text-foreground">Dashboard Quản trị</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                    <Settings className="h-4 w-4 mr-2" />
                    Cài đặt
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Cài đặt tài khoản</DialogTitle>
                  </DialogHeader>
                  <AccountSettings userRole="admin" />
                </DialogContent>
              </Dialog>
              <Link to="/">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  <Home className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">Tổng quan hệ thống</h2>
          <p className="text-muted-foreground">Quản lý và giám sát toàn bộ mạng lưới trạm đổi pin</p>
        </div>

        {/* Modern KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-l-4 border-l-green-500 bg-card/50 hover:bg-card/80 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Doanh thu</p>
                  <p className="text-2xl font-bold text-foreground">2.85M</p>
                  <p className="text-xs text-green-600 mt-1">+12% so với tháng trước</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500 opacity-80" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-blue-500 bg-card/50 hover:bg-card/80 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Người dùng</p>
                  <p className="text-2xl font-bold text-foreground">1,248</p>
                  <p className="text-xs text-blue-600 mt-1">+8% so với tuần trước</p>
                </div>
                <Users className="h-8 w-8 text-blue-500 opacity-80" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-orange-500 bg-card/50 hover:bg-card/80 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Đổi pin hôm nay</p>
                  <p className="text-2xl font-bold text-foreground">156</p>
                  <p className="text-xs text-orange-600 mt-1">+3% so với hôm qua</p>
                </div>
                <Battery className="h-8 w-8 text-orange-500 opacity-80" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-primary bg-card/50 hover:bg-card/80 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Trạm hoạt động</p>
                  <p className="text-2xl font-bold text-foreground">12</p>
                  <p className="text-xs text-primary mt-1">100% uptime</p>
                </div>
                <MapPin className="h-8 w-8 text-primary opacity-80" />
              </div>
            </CardContent>
          </Card>
        </div>


        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-card/50 hover:bg-card/80 transition-colors duration-200">
            <CardHeader>
              <CardTitle className="flex items-center text-foreground">
                <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                Báo cáo tổng hợp
              </CardTitle>
              <CardDescription>
                Xem báo cáo chi tiết về doanh thu, KPI và hiệu suất
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/admin/reports">
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Xem báo cáo
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-card/50 hover:bg-card/80 transition-colors duration-200">
            <CardHeader>
              <CardTitle className="flex items-center text-foreground">
                <Battery className="h-5 w-5 mr-2 text-primary" />
                Điều phối pin
              </CardTitle>
              <CardDescription>
                Quản lý phân phối và chuyển pin giữa các trạm
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/admin/battery-dispatch">
                <Button className="w-full" variant="outline">
                  Điều phối pin
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-card/50 hover:bg-card/80 transition-colors duration-200">
            <CardHeader>
              <CardTitle className="flex items-center text-foreground">
                <Users className="h-5 w-5 mr-2 text-primary" />
                Quản lý nhân viên
              </CardTitle>
              <CardDescription>
                Phân công nhân viên cho các trạm đổi pin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/admin/staff-management">
                <Button className="w-full" variant="secondary">
                  Quản lý nhân viên
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;