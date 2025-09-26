import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Calendar, MapPin, Car, Battery, CreditCard, X, Home, AlertTriangle, Filter, Search, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import batteryIcon from "@/assets/battery-icon.jpg";

const BookingHistory = () => {
  const { toast } = useToast();
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [cancelDepositDialogOpen, setCancelDepositDialogOpen] = useState(false);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [methodFilter, setMethodFilter] = useState("all");
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
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

  const handleSubmitReview = () => {
    if (rating === 0) {
      toast({
        title: "Lỗi",
        description: "Vui lòng chọn số sao đánh giá",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Đánh giá thành công!",
      description: "Cảm ơn bạn đã đánh giá trải nghiệm dịch vụ",
    });
    
    setReviewDialogOpen(false);
    setRating(0);
    setReviewText("");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Calendar className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-semibold text-foreground">Lịch sử đặt chỗ</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Link to="/driver">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
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
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-l-4 border-l-primary bg-card/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Tổng đặt chỗ</p>
                  <p className="text-2xl font-bold text-foreground">{bookings.length}</p>
                </div>
                <Calendar className="h-8 w-8 text-primary opacity-80" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-green-500 bg-card/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Đã hoàn thành</p>
                  <p className="text-2xl font-bold text-foreground">{bookings.filter(b => b.status === "Hoàn thành").length}</p>
                </div>
                <CreditCard className="h-8 w-8 text-green-500 opacity-80" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-orange-500 bg-card/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Đang chờ</p>
                  <p className="text-2xl font-bold text-foreground">{bookings.filter(b => b.canCancel).length}</p>
                </div>
                <Battery className="h-8 w-8 text-orange-500 opacity-80" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="mb-6 bg-card/50">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm mã đặt chỗ, trạm..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-background"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả trạng thái</SelectItem>
                  <SelectItem value="Hoàn thành">Hoàn thành</SelectItem>
                  <SelectItem value="Đã thanh toán">Đã thanh toán</SelectItem>
                  <SelectItem value="Đã cọc">Đã cọc</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={methodFilter} onValueChange={setMethodFilter}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Phương thức" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả phương thức</SelectItem>
                  <SelectItem value="Thanh toán đầy đủ">Thanh toán đầy đủ</SelectItem>
                  <SelectItem value="Đặt cọc">Đặt cọc</SelectItem>
                </SelectContent>
              </Select>
              
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                  setMethodFilter("all");
                }}
                className="bg-background hover:bg-muted"
              >
                <X className="h-4 w-4 mr-2" />
                Xóa bộ lọc
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Bookings List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground">
              Danh sách đặt chỗ 
              <span className="text-sm font-normal text-muted-foreground ml-2">({bookings.length} kết quả)</span>
            </h2>
          </div>

          {bookings.length === 0 ? (
            <Card className="bg-card/50">
              <CardContent className="p-12 text-center">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Không tìm thấy đặt chỗ nào</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <Card key={booking.id} className="bg-card/50 hover:bg-card/80 transition-colors duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-semibold text-foreground">#{booking.id}</h3>
                          <Badge 
                            variant={getStatusColor(booking.status)}
                            className="text-xs"
                          >
                            {booking.status}
                          </Badge>
                          <Badge 
                            variant={getMethodColor(booking.bookingMethod)}
                            className="text-xs"
                          >
                            {booking.bookingMethod}
                          </Badge>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-2" />
                          {booking.bookingTime}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {booking.canCancel && (
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
                        
                        {(booking.status === "Hoàn thành" || booking.status === "Đã thanh toán") && (
                          <>
                            <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="default" 
                                  size="sm"
                                  onClick={() => setSelectedBooking(booking)}
                                >
                                  <Star className="h-4 w-4 mr-1" />
                                  Đánh giá
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                  <DialogTitle>Đánh giá trải nghiệm</DialogTitle>
                                  <DialogDescription>
                                    Hãy chia sẻ trải nghiệm của bạn về dịch vụ đổi pin #{selectedBooking?.id}
                                  </DialogDescription>
                                </DialogHeader>
                                
                                <div className="space-y-6 p-2">
                                  {/* Star Rating */}
                                  <div className="text-center">
                                    <Label className="text-sm font-medium mb-3 block">Đánh giá chất lượng dịch vụ</Label>
                                    <div className="flex justify-center space-x-2">
                                      {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                          key={star}
                                          type="button"
                                          onClick={() => setRating(star)}
                                          className="transition-colors duration-200"
                                        >
                                          <Star 
                                            className={`h-8 w-8 ${
                                              star <= rating 
                                                ? "text-yellow-400 fill-yellow-400" 
                                                : "text-gray-300 hover:text-yellow-200"
                                            }`}
                                          />
                                        </button>
                                      ))}
                                    </div>
                                    {rating > 0 && (
                                      <p className="text-sm text-muted-foreground mt-2">
                                        {rating === 1 && "Rất không hài lòng"}
                                        {rating === 2 && "Không hài lòng"}
                                        {rating === 3 && "Bình thường"}
                                        {rating === 4 && "Hài lòng"}
                                        {rating === 5 && "Rất hài lòng"}
                                      </p>
                                    )}
                                  </div>

                                  {/* Review Text */}
                                  <div>
                                    <Label htmlFor="review" className="text-sm font-medium mb-2 block">
                                      Nhận xét chi tiết (tùy chọn)
                                    </Label>
                                    <Textarea
                                      id="review"
                                      placeholder="Chia sẻ trải nghiệm của bạn về dịch vụ đổi pin..."
                                      value={reviewText}
                                      onChange={(e) => setReviewText(e.target.value)}
                                      className="min-h-[100px] resize-none"
                                      maxLength={500}
                                    />
                                    <p className="text-xs text-muted-foreground mt-2">
                                      {reviewText.length}/500 ký tự
                                    </p>
                                  </div>
                                </div>

                                <DialogFooter className="flex space-x-2">
                                  <Button 
                                    variant="outline" 
                                    onClick={() => {
                                      setReviewDialogOpen(false);
                                      setRating(0);
                                      setReviewText("");
                                    }}
                                    className="flex-1"
                                  >
                                    Hủy
                                  </Button>
                                  <Button 
                                    onClick={handleSubmitReview}
                                    className="flex-1"
                                  >
                                    Gửi đánh giá
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </>
                        )}
                        
                        {booking.status === "Hoàn thành" && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <CreditCard className="h-4 w-4 mr-1" />
                                Xem QR
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                              <DialogHeader>
                                <DialogTitle>QR Code đổi pin</DialogTitle>
                                <DialogDescription>
                                  Mã QR đã được sử dụng cho giao dịch này
                                </DialogDescription>
                              </DialogHeader>
                              
                              <div className="text-center p-6">
                                <div className="w-48 h-48 mx-auto bg-muted rounded-lg flex items-center justify-center mb-4">
                                  <div className="text-center">
                                    <CreditCard className="h-16 w-16 mx-auto mb-2 text-primary" />
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

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div className="space-y-1">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Car className="h-3 w-3 mr-1" />
                          Phương tiện
                        </div>
                        <p className="font-medium text-sm">{booking.vehicleType}</p>
                        <p className="text-xs text-muted-foreground">{booking.batteryType}</p>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3 mr-1" />
                          Địa điểm
                        </div>
                        <p className="font-medium text-sm">{booking.stationLocation}</p>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <CreditCard className="h-3 w-3 mr-1" />
                          Số tiền
                        </div>
                        <p className="font-semibold text-sm text-green-600">{booking.amount.toLocaleString()} VNĐ</p>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Battery className="h-3 w-3 mr-1" />
                          Pin {booking.batteryInfo?.code}
                        </div>
                        <p className="text-sm">
                          SoH: <span className={`font-semibold ${booking.batteryInfo?.soh >= 90 ? 'text-green-600' : booking.batteryInfo?.soh >= 70 ? 'text-orange-500' : 'text-red-500'}`}>
                            {booking.batteryInfo?.soh}%
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="border-t pt-3 mt-4">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs text-muted-foreground">
                        <div>
                          <span>Chu kỳ: </span>
                          <span className="font-medium">{booking.batteryInfo?.chargeCycles} lần</span>
                        </div>
                        <div>
                          <span>SX: </span>
                          <span className="font-medium">{booking.batteryInfo?.manufactureDate}</span>
                        </div>
                        <div>
                          <span>HSD: </span>
                          <span className="font-medium">{booking.batteryInfo?.expiryDate}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingHistory;