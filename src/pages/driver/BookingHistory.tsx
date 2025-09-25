import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Calendar, MapPin, Car, Battery, CreditCard, X, Home, AlertTriangle, Filter, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import batteryIcon from "@/assets/battery-icon.jpg";

const BookingHistory = () => {
  const { toast } = useToast();
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [cancelDepositDialogOpen, setCancelDepositDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [methodFilter, setMethodFilter] = useState("all");
  const [bankInfo, setBankInfo] = useState({
    accountNumber: "",
    bankName: "",
    accountHolder: "",
    reason: ""
  });

  const allBookings = [
    {
      id: "BK004",
      vehicleType: "VinFast VF8",
      batteryType: "Lithium-ion",
      bookingTime: "18/01/2024 10:15",
      paymentTime: "18/01/2024 10:20",
      stationLocation: "Trạm Quận 7 - 999 Nguyễn Văn Linh",
      bookingMethod: "Đặt cọc",
      status: "Đã cọc",
      amount: "50,000",
      canCancel: true,
      batteryInfo: {
        code: "BT-4001",
        soh: 92,
        chargeCycles: 450,
        manufactureDate: "10/03/2023",
        expiryDate: "10/03/2028"
      }
    },
    {
      id: "BK003",
      vehicleType: "VinFast VF6",
      batteryType: "Lithium-ion", 
      bookingTime: "17/01/2024 16:45",
      paymentTime: "17/01/2024 16:50",
      stationLocation: "Trạm Quận 3 - 456 Lê Văn Sỹ",
      bookingMethod: "Thanh toán đầy đủ",
      status: "Đã thanh toán",
      amount: "110,000",
      canCancel: false,
      batteryInfo: {
        code: "BT-3001",
        soh: 85,
        chargeCycles: 620,
        manufactureDate: "05/12/2022",
        expiryDate: "05/12/2027"
      }
    },
    {
      id: "BK002", 
      vehicleType: "VinFast VF9",
      batteryType: "LFP",
      bookingTime: "16/01/2024 09:15",
      paymentTime: "16/01/2024 09:20",
      stationLocation: "Trạm Bình Thạnh - 789 Xô Viết Nghệ Tĩnh",
      bookingMethod: "Thanh toán đầy đủ",
      status: "Đã thanh toán",
      amount: "120,000",
      canCancel: false,
      batteryInfo: {
        code: "BT-2001",
        soh: 95,
        chargeCycles: 320,
        manufactureDate: "15/08/2023",
        expiryDate: "15/08/2028"
      }
    },
    {
      id: "BK001",
      vehicleType: "VinFast VF8",
      batteryType: "Lithium-ion",
      bookingTime: "15/01/2024 14:30",
      paymentTime: "15/01/2024 14:35",
      stationLocation: "Trạm Quận 1 - 123 Nguyễn Huệ",
      bookingMethod: "Thanh toán đầy đủ",
      status: "Hoàn thành",
      amount: "120,000",
      canCancel: false,
      batteryInfo: {
        code: "BT-1001",
        soh: 88,
        chargeCycles: 580,
        manufactureDate: "20/05/2022",
        expiryDate: "20/05/2027"
      }
    }
  ];

  // Filter and sort bookings
  const filteredBookings = allBookings.filter(booking => {
    const matchesSearch = booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.stationLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.vehicleType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
    const matchesMethod = methodFilter === "all" || booking.bookingMethod === methodFilter;
    
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const bookings = filteredBookings;

  const handleCancelBooking = () => {
    if (!bankInfo.accountNumber || !bankInfo.bankName || !bankInfo.accountHolder) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin ngân hàng",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Yêu cầu hủy cọc đã được gửi",
      description: "Chúng tôi sẽ xử lý và hoàn tiền trong vòng 24h",
    });
    
    setCancelDialogOpen(false);
    setBankInfo({ accountNumber: "", bankName: "", accountHolder: "", reason: "" });
  };

  const handleCancelDeposit = () => {
    toast({
      title: "Yêu cầu hủy cọc đã được gửi",
      description: "Chúng tôi sẽ xử lý và hoàn tiền trong vòng 24h",
    });
    setCancelDepositDialogOpen(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Hoàn thành": return "default";
      case "Đã cọc": return "secondary";
      case "Đã thanh toán": return "outline";
      default: return "default";
    }
  };

  const getMethodColor = (method) => {
    return method === "Đặt cọc" ? "destructive" : "default";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Clean Header */}
      <header className="relative bg-white/80 backdrop-blur-md border-b shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Lịch sử đặt chỗ</h1>
                <p className="text-sm text-muted-foreground">Theo dõi và quản lý các đơn đặt chỗ của bạn</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Link to="/driver">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <Home className="h-4 w-4 mr-2" />
                  Trang chủ
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-0 shadow-sm bg-white/60 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Tổng đặt chỗ</p>
                  <p className="text-2xl font-bold text-foreground">{bookings.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm bg-white/60 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-50 rounded-lg">
                  <CreditCard className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Hoàn thành</p>
                  <p className="text-2xl font-bold text-foreground">{bookings.filter(b => !b.canCancel).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm bg-white/60 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-orange-50 rounded-lg">
                  <Battery className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Đang chờ</p>
                  <p className="text-2xl font-bold text-foreground">{bookings.filter(b => b.canCancel).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="border-0 shadow-sm bg-white/60 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="search" className="text-sm font-medium">Tìm kiếm</Label>
                <div className="relative mt-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Mã đặt chỗ, trạm..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-0 bg-white/80"
                  />
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">Trạng thái</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="mt-1 border-0 bg-white/80">
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="Hoàn thành">Hoàn thành</SelectItem>
                    <SelectItem value="Đã thanh toán">Đã thanh toán</SelectItem>
                    <SelectItem value="Đã cọc">Đã cọc</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium">Phương thức</Label>
                <Select value={methodFilter} onValueChange={setMethodFilter}>
                  <SelectTrigger className="mt-1 border-0 bg-white/80">
                    <SelectValue placeholder="Chọn phương thức" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="Thanh toán đầy đủ">Thanh toán đầy đủ</SelectItem>
                    <SelectItem value="Đặt cọc">Đặt cọc</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                    setMethodFilter("all");
                  }}
                  className="w-full mt-1 border-0 bg-white/80"
                >
                  Xóa bộ lọc
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bookings List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Danh sách đặt chỗ</h2>
            <Badge variant="secondary" className="text-sm">{bookings.length} kết quả</Badge>
          </div>
          
          <div className="space-y-4">
            {bookings.map((booking) => (
              <Card key={booking.id} className="border-0 shadow-sm bg-white/60 backdrop-blur-sm hover:shadow-md transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    {/* Left Side - Main Info */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-semibold text-foreground">#{booking.id}</h3>
                        <Badge 
                          variant={getStatusColor(booking.status)}
                          className="px-2 py-1"
                        >
                          {booking.status}
                        </Badge>
                        <Badge 
                          variant={getMethodColor(booking.bookingMethod)}
                          className="px-2 py-1"
                        >
                          {booking.bookingMethod}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Car className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Xe:</span>
                          <span className="font-medium">{booking.vehicleType}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Trạm:</span>
                          <span className="font-medium truncate">{booking.stationLocation}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Thời gian:</span>
                          <span className="font-medium">{booking.bookingTime}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CreditCard className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Số tiền:</span>
                          <span className="font-medium text-green-600">{booking.amount} VNĐ</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Side - Actions */}
                    <div className="flex space-x-2">
                      {booking.canCancel && booking.status === "Đã cọc" && (
                        <Dialog open={cancelDepositDialogOpen} onOpenChange={setCancelDepositDialogOpen}>
                          <DialogTrigger asChild>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => setSelectedBooking(booking)}
                            >
                              <X className="h-4 w-4 mr-1" />
                              Hủy lịch
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle>Xác nhận hủy lịch</DialogTitle>
                              <DialogDescription>
                                Bạn có chắc chắn muốn hủy lịch cho đặt chỗ #{selectedBooking?.id}?
                              </DialogDescription>
                            </DialogHeader>
                            
                            <div className="text-center p-6">
                              <AlertTriangle className="h-16 w-16 mx-auto mb-4 text-orange-500" />
                              <p className="text-sm mb-2">
                                <strong>Số tiền:</strong> {selectedBooking?.amount} VNĐ
                              </p>
                              <p className="text-sm text-muted-foreground mb-4">
                                Tiền sẽ được hoàn lại trong vòng 24 giờ
                              </p>
                            </div>

                            <DialogFooter className="flex space-x-2">
                              <Button 
                                variant="outline" 
                                onClick={() => setCancelDepositDialogOpen(false)}
                                className="flex-1"
                              >
                                Hủy
                              </Button>
                              <Button 
                                variant="destructive" 
                                onClick={handleCancelDeposit}
                                className="flex-1"
                              >
                                Xác nhận hủy lịch
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      )}
                      
                      {booking.status === "Hoàn thành" && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="secondary" 
                              size="sm"
                            >
                              <CreditCard className="h-4 w-4 mr-1" />
                              Xem QR
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle>QR Code đổi pin</DialogTitle>
                              <DialogDescription>
                                Mã QR đã hoàn thành cho lần đổi pin này
                              </DialogDescription>
                            </DialogHeader>
                            
                            <div className="text-center p-6">
                              <div className="w-48 h-48 mx-auto bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                                <div className="text-center">
                                  <CreditCard className="h-16 w-16 mx-auto mb-2 text-blue-600" />
                                  <p className="text-sm font-medium">QR Code #{booking.id}</p>
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Mã đặt chỗ: {booking.id}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Trạm: {booking.stationLocation}
                              </p>
                            </div>

                            <DialogFooter>
                              <Button variant="outline" className="w-full">
                                Đóng
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>
                  </div>

                  {/* Battery Information */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="flex items-center text-sm font-medium text-muted-foreground mb-3">
                      <Battery className="h-4 w-4 mr-1" />
                      Thông tin chi tiết pin
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Mã pin</p>
                        <p className="font-medium">{booking.batteryInfo?.code}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">SoH</p>
                        <p className={`font-medium ${
                          booking.batteryInfo?.soh >= 90 ? 'text-green-600' : 
                          booking.batteryInfo?.soh >= 70 ? 'text-orange-600' : 
                          'text-red-600'
                        }`}>
                          {booking.batteryInfo?.soh}%
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Chu kỳ sạc</p>
                        <p className="font-medium">{booking.batteryInfo?.chargeCycles} lần</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Ngày sản xuất</p>
                        <p className="font-medium">{booking.batteryInfo?.manufactureDate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Hạn sử dụng</p>
                        <p className="font-medium">{booking.batteryInfo?.expiryDate}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingHistory;