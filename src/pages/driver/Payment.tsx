import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CreditCard, QrCode, Wallet, Home, Zap, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("full");
  const [selectedMethod, setSelectedMethod] = useState("card");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Enhanced Header */}
      <header className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
          <div 
            className="absolute top-10 right-1/4 w-72 h-72 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"
            style={{ animationDelay: '2s' }}
          ></div>
        </div>

        <div className="relative z-20 container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative p-3 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                <CreditCard className="h-10 w-10 text-white" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-ping"></div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"></div>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">Thanh toán an toàn</h1>
                <p className="text-white/90 text-lg">Hoàn tất đặt chỗ với phương thức thanh toán ưa thích</p>
              </div>
            </div>
            <Link to="/driver/reservation">
              <Button variant="ghost" className="text-white hover:bg-white/20 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Quay lại
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Payment Methods */}
          <div className="space-y-6">
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm animate-fade-in">
              <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-bold text-gray-800">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl mr-4">
                    <CreditCard className="h-6 w-6 text-white" />
                  </div>
                  Phương thức thanh toán
                </CardTitle>
                <CardDescription className="text-gray-600 text-base">
                  Chọn phương thức thanh toán thuận tiện cho bạn
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod}>
                  <div className="space-y-4">
                    {[
                      { value: "card", icon: CreditCard, label: "Thẻ tín dụng/ghi nợ", desc: "Visa, Mastercard, JCB", color: "from-blue-500 to-indigo-500" },
                      { value: "wallet", icon: Wallet, label: "Ví điện tử", desc: "MoMo, ZaloPay, ViettelPay", color: "from-green-500 to-emerald-500" },
                      { value: "qr", icon: QrCode, label: "QR Banking", desc: "Quét mã QR để thanh toán", color: "from-purple-500 to-pink-500" }
                    ].map((method) => (
                      <div key={method.value} className={`flex items-center space-x-4 p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-lg ${
                        selectedMethod === method.value 
                          ? 'border-blue-500 bg-blue-50 shadow-md' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}>
                        <RadioGroupItem value={method.value} id={method.value} className="w-5 h-5" />
                        <div className={`p-3 bg-gradient-to-r ${method.color} rounded-xl`}>
                          <method.icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <Label htmlFor={method.value} className="text-lg font-semibold text-gray-800 cursor-pointer">
                            {method.label}
                          </Label>
                          <p className="text-sm text-gray-600 mt-1">{method.desc}</p>
                        </div>
                        {selectedMethod === method.value && (
                          <CheckCircle className="h-6 w-6 text-blue-500" />
                        )}
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Security Info */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-green-50 to-emerald-50 animate-slide-up">
              <CardHeader>
                <CardTitle className="flex items-center text-green-800">
                  <Shield className="h-6 w-6 mr-2" />
                  Bảo mật thanh toán
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "Mã hóa SSL 256-bit",
                  "Tuân thủ chuẩn PCI DSS",
                  "Không lưu trữ thông tin thẻ",
                  "Xác thực 2 lớp"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Payment Summary */}
          <div>
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm animate-scale-in sticky top-6">
              <div className="h-2 bg-gradient-to-r from-green-500 to-emerald-500"></div>
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-bold text-gray-800">
                  <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl mr-4">
                    <CreditCard className="h-6 w-6 text-white" />
                  </div>
                  Chi tiết thanh toán
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4 pb-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Trạm:</span>
                    <span className="font-semibold text-gray-800">Trạm Quận 1</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Ngày giờ:</span>
                    <span className="font-semibold text-gray-800">15/12/2024 - 14:30</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Dịch vụ:</span>
                    <Badge className="bg-blue-100 text-blue-800">Đổi pin nhanh</Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Phí dịch vụ:</span>
                    <span className="font-semibold text-gray-800">150,000 VNĐ</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Phí xử lý:</span>
                    <span className="font-semibold text-gray-800">0 VNĐ</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span className="text-gray-800">Tổng thanh toán:</span>
                    <span className="text-blue-600">150,000 VNĐ</span>
                  </div>
                </div>

                <div className="space-y-4 pt-6">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
                    <Zap className="h-5 w-5 mr-2" />
                    Thanh toán & Nhận QR
                  </Button>
                  
                  <Link to="/driver" className="block">
                    <Button variant="outline" className="w-full border-2 border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl py-4 text-lg font-semibold transition-all duration-300 hover:scale-105">
                      <Home className="h-5 w-5 mr-2" />
                      Về Dashboard
                    </Button>
                  </Link>
                  
                  <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                    <QrCode className="h-20 w-20 mx-auto mb-4 text-blue-600" />
                    <p className="text-lg font-semibold text-blue-800 mb-2">QR Code sẽ được tạo sau khi thanh toán</p>
                    <p className="text-sm text-blue-600">Xuất trình QR này tại trạm để đổi pin</p>
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

export default Payment;