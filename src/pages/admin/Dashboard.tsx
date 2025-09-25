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
      {/* Enhanced Header */}
      <header className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white p-8">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
        <div className="container mx-auto relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 animate-slide-up">
              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                <BarChart3 className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-1">Dashboard Quản trị</h1>
                <p className="text-white/80">Trung tâm điều khiển hệ thống</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 animate-fade-in">
              <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" className="text-white border-white/20 hover:bg-white/20 backdrop-blur-sm">
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
                <Button variant="ghost" className="text-white border-white/20 hover:bg-white/20 backdrop-blur-sm">
                  <Home className="h-4 w-4 mr-2" />
                  Trang chủ
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6">
        <div className="mb-8 animate-fade-in">
          <h2 className="text-3xl font-bold text-foreground mb-2">Tổng quan hệ thống</h2>
          <p className="text-muted-foreground">Quản lý và giám sát toàn bộ mạng lưới trạm đổi pin</p>
        </div>

        {/* Key Performance Indicators */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-slide-up">
          <Card className="hover-scale">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-12 w-12 text-success mx-auto mb-4" />
              <h3 className="text-2xl font-bold">2.85M</h3>
              <p className="text-muted-foreground">Doanh thu (VNĐ)</p>
              <p className="text-xs text-success mt-1">+12% so với tháng trước</p>
            </CardContent>
          </Card>
          <Card className="hover-scale">
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 text-electric-blue mx-auto mb-4" />
              <h3 className="text-2xl font-bold">1,248</h3>
              <p className="text-muted-foreground">Người dùng hoạt động</p>
              <p className="text-xs text-electric-blue mt-1">+8% so với tuần trước</p>
            </CardContent>
          </Card>
          <Card className="hover-scale">
            <CardContent className="p-6 text-center">
              <Battery className="h-12 w-12 text-warning mx-auto mb-4" />
              <h3 className="text-2xl font-bold">156</h3>
              <p className="text-muted-foreground">Lần đổi pin hôm nay</p>
              <p className="text-xs text-warning mt-1">+3% so với hôm qua</p>
            </CardContent>
          </Card>
          <Card className="hover-scale">
            <CardContent className="p-6 text-center">
              <MapPin className="h-12 w-12 text-charging mx-auto mb-4" />
              <h3 className="text-2xl font-bold">12</h3>
              <p className="text-muted-foreground">Trạm hoạt động</p>
              <p className="text-xs text-charging mt-1">100% uptime</p>
            </CardContent>
          </Card>
        </div>


        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="hover-glow">
            <CardHeader>
              <CardTitle className="flex items-center text-electric-blue">
                <BarChart3 className="h-6 w-6 mr-2" />
                Báo cáo tổng hợp
              </CardTitle>
              <CardDescription>
                Xem báo cáo chi tiết về doanh thu, KPI và hiệu suất
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/admin/reports">
                <Button className="w-full">Xem báo cáo</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover-glow">
            <CardHeader>
              <CardTitle className="flex items-center text-electric-blue">
                <Battery className="h-6 w-6 mr-2" />
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

          <Card className="hover-glow">
            <CardHeader>
              <CardTitle className="flex items-center text-electric-blue">
                <Users className="h-6 w-6 mr-2" />
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