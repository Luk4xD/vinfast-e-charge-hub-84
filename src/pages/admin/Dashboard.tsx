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
      {/* Header with gradient background like the image */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-6">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 p-2 rounded-lg">
              <BarChart3 className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Dashboard Quản trị</h1>
              <p className="text-blue-100 text-sm">Quản lý toàn bộ hệ thống trạm đổi pin</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm">Hệ thống hoạt động</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <span className="text-sm">Hiệu suất cao</span>
            </div>
            <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" className="text-white hover:bg-white/20">
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
              <Button variant="ghost" className="text-white hover:bg-white/20">
                <Home className="h-4 w-4 mr-2" />
                Trang chủ
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main content area */}
          <div className="lg:col-span-3">
            {/* Welcome message */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Chào mừng quản trị viên!</h2>
              <p className="text-gray-600">Quản lý và giám sát toàn bộ mạng lưới trạm đổi pin</p>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-green-500"></div>
                <CardContent className="p-6 text-center">
                  <div className="bg-green-500 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800">2.85M</h3>
                  <p className="text-gray-600 text-sm">Doanh thu (VNĐ)</p>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500"></div>
                <CardContent className="p-6 text-center">
                  <div className="bg-blue-500 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800">1,248</h3>
                  <p className="text-gray-600 text-sm">Người dùng hoạt động</p>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-orange-500"></div>
                <CardContent className="p-6 text-center">
                  <div className="bg-orange-500 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Battery className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800">156</h3>
                  <p className="text-gray-600 text-sm">Lần đổi pin hôm nay</p>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-purple-500"></div>
                <CardContent className="p-6 text-center">
                  <div className="bg-purple-500 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800">12</h3>
                  <p className="text-gray-600 text-sm">Trạm hoạt động</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-white hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-gray-800">
                    <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                    Báo cáo tổng hợp
                  </CardTitle>
                  <CardDescription>
                    Xem báo cáo chi tiết về doanh thu, KPI và hiệu suất
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to="/admin/reports">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Xem báo cáo
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-white hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-gray-800">
                    <Battery className="h-5 w-5 mr-2 text-orange-600" />
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

              <Card className="bg-white hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-gray-800">
                    <Users className="h-5 w-5 mr-2 text-green-600" />
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

          {/* Sidebar info card */}
          <div className="lg:col-span-1">
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500"></div>
              <CardHeader className="bg-blue-50">
                <CardTitle className="flex items-center text-blue-600">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Hệ thống quản trị
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Quyền truy cập:</span>
                  <span className="font-semibold">Quản trị viên</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phạm vi:</span>
                  <span className="font-semibold">Toàn quốc</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Trạng thái:</span>
                  <span className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-green-600 font-semibold">Hoạt động</span>
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Doanh thu hôm nay:</span>
                  <span className="font-semibold text-green-600">2.85M</span>
                </div>
                <div className="pt-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Hiệu suất hệ thống:</span>
                    <span className="font-semibold">95/100</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '95%'}}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;