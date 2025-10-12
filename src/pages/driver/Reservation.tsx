import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Clock, MapPin, Battery, Zap, Star, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

interface StationReservation {
  stationId: string;
  date: Date | undefined;
  time: string;
}

const Reservation = () => {
  const [activeStation, setActiveStation] = useState<string | null>(null);
  const [reservations, setReservations] = useState<StationReservation[]>([]);

  const timeSlots = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
    "11:00", "11:30", "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30", "18:00", "18:30"
  ];

  const stations = [
    { 
      id: "1", 
      name: "Trạm Quận 1", 
      address: "123 Nguyễn Huệ", 
      available: 8,
      rating: 4.9,
      batteryTypes: {
        "Lithium-ion": 5,
        "Pin LFP": 3,
        "Ắc quy chì": 0
      }
    },
    { 
      id: "2", 
      name: "Trạm Quận 3", 
      address: "456 Lê Văn Sỹ", 
      available: 5,
      rating: 4.7,
      batteryTypes: {
        "Lithium-ion": 3,
        "Pin LFP": 2,
        "Ắc quy chì": 0
      }
    },
    { 
      id: "3", 
      name: "Trạm Bình Thạnh", 
      address: "789 Xô Viết Nghệ Tĩnh", 
      available: 12,
      rating: 4.8,
      batteryTypes: {
        "Lithium-ion": 8,
        "Pin LFP": 4,
        "Ắc quy chì": 0
      }
    }
  ];

  const getReservation = (stationId: string) => {
    return reservations.find(r => r.stationId === stationId);
  };

  const updateReservation = (stationId: string, date?: Date, time?: string) => {
    const existing = reservations.find(r => r.stationId === stationId);
    if (existing) {
      setReservations(reservations.map(r => 
        r.stationId === stationId 
          ? { ...r, date: date !== undefined ? date : r.date, time: time !== undefined ? time : r.time }
          : r
      ));
    } else {
      setReservations([...reservations, { stationId, date, time: time || "" }]);
    }
  };

  const totalCost = reservations.filter(r => r.date && r.time).length * 150000;

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 mb-6">
        <div className="px-6 py-4">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Đặt lịch</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Chọn trạm và đặt lịch riêng cho từng trạm
          </p>
        </div>
      </header>

      <div className="container mx-auto px-6 max-w-7xl pb-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Stations List */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
              <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-bold text-gray-800">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mr-3">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  Danh sách trạm
                </CardTitle>
              </CardHeader>
            </Card>

            {/* Station Cards */}
            {stations.map((station) => {
              const reservation = getReservation(station.id);
              const isActive = activeStation === station.id;
              const isBooked = reservation?.date && reservation?.time;

              return (
                <Card 
                  key={station.id}
                  className={`border-0 shadow-xl bg-white/90 backdrop-blur-sm animate-fade-in transition-all duration-300 ${
                    isActive ? 'ring-4 ring-blue-500 scale-[1.02]' : ''
                  }`}
                >
                  <div className={`h-2 ${isBooked ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-blue-500 to-indigo-500'}`}></div>
                  
                  {/* Station Info */}
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-800">{station.name}</h3>
                          {isBooked && (
                            <Badge className="bg-green-500 flex items-center gap-1">
                              <CheckCircle2 className="h-3 w-3" />
                              Đã đặt
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600 mb-3">
                          <MapPin className="h-4 w-4" />
                          <span className="text-sm">{station.address}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-semibold text-yellow-600 ml-1">
                              {station.rating} đánh giá
                            </span>
                          </div>
                          <Badge className="bg-green-500">
                            <Battery className="h-3 w-3 mr-1" />
                            {station.available} pin có sẵn
                          </Badge>
                        </div>
                      </div>
                      <Button
                        onClick={() => setActiveStation(isActive ? null : station.id)}
                        className={`${
                          isActive 
                            ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600' 
                            : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600'
                        } text-white`}
                      >
                        {isActive ? 'Đóng' : 'Đặt lịch'}
                      </Button>
                    </div>

                    {/* Pin reserved info */}
                    <div className="p-4 bg-gradient-to-br from-white to-blue-50 rounded-lg border border-blue-100 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="p-2 bg-blue-500 rounded-lg">
                            <Zap className="h-4 w-4 text-white" />
                          </div>
                          <p className="text-sm font-medium text-gray-700">Pin đã đặt tại trạm</p>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            {Math.floor(Math.random() * 15) + 5}
                          </span>
                          <span className="text-sm text-gray-500">pin</span>
                        </div>
                      </div>
                    </div>

                    {/* Date & Time Selection (shown when active) */}
                    {isActive && (
                      <div className="mt-6 space-y-6 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200 animate-slide-in">
                        {/* Date Selection */}
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                            <CalendarIcon className="h-5 w-5 mr-2 text-blue-600" />
                            Chọn ngày
                          </h4>
                          <div className="flex justify-center bg-white rounded-lg p-4">
                            <Calendar
                              mode="single"
                              selected={reservation?.date}
                              onSelect={(date) => updateReservation(station.id, date)}
                              className="rounded-xl border-0"
                              locale={vi}
                              disabled={(date) => date < new Date()}
                            />
                          </div>
                        </div>

                        {/* Time Selection */}
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                            <Clock className="h-5 w-5 mr-2 text-orange-600" />
                            Chọn khung giờ
                          </h4>
                          <div className="grid grid-cols-3 gap-3">
                            {timeSlots.map((time) => (
                              <Button
                                key={time}
                                variant={reservation?.time === time ? "default" : "outline"}
                                onClick={() => updateReservation(station.id, undefined, time)}
                                className={`h-12 text-sm font-medium transition-all duration-300 hover:scale-105 ${
                                  reservation?.time === time 
                                    ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg' 
                                    : 'border-2 border-gray-200 hover:border-orange-300 bg-white'
                                }`}
                              >
                                <Clock className="h-4 w-4 mr-1" />
                                {time}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm animate-fade-in sticky top-6">
              <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              <CardHeader>
                <CardTitle className="flex items-center text-xl font-bold text-gray-800">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mr-3">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  Tổng quan đặt lịch
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {reservations.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Battery className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p className="text-sm">Chưa có trạm nào được đặt</p>
                    <p className="text-xs mt-1">Chọn trạm và đặt lịch ngay</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {reservations.map((reservation) => {
                      const station = stations.find(s => s.id === reservation.stationId);
                      if (!station) return null;
                      
                      const isComplete = reservation.date && reservation.time;
                      
                      return (
                        <div 
                          key={reservation.stationId}
                          className={`p-4 rounded-xl border-2 ${
                            isComplete 
                              ? 'bg-green-50 border-green-300' 
                              : 'bg-gray-50 border-gray-300'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <MapPin className={`h-4 w-4 ${isComplete ? 'text-green-600' : 'text-gray-600'}`} />
                                <p className="font-semibold text-gray-800 text-sm">{station.name}</p>
                              </div>
                              <p className="text-xs text-gray-600 ml-6">{station.address}</p>
                            </div>
                            {isComplete && (
                              <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                            )}
                          </div>

                          <div className="space-y-2 ml-6">
                            {reservation.date ? (
                              <div className="flex items-center gap-2">
                                <CalendarIcon className="h-3 w-3 text-purple-600" />
                                <p className="text-xs text-gray-700">
                                  {format(reservation.date, "dd/MM/yyyy", { locale: vi })}
                                </p>
                              </div>
                            ) : (
                              <p className="text-xs text-gray-400">Chưa chọn ngày</p>
                            )}

                            {reservation.time ? (
                              <div className="flex items-center gap-2">
                                <Clock className="h-3 w-3 text-orange-600" />
                                <p className="text-xs text-gray-700">{reservation.time}</p>
                              </div>
                            ) : (
                              <p className="text-xs text-gray-400">Chưa chọn giờ</p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {reservations.some(r => r.date && r.time) && (
                  <>
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <div className="flex justify-between mb-2 text-sm">
                        <span className="text-gray-700">Số trạm đã đặt:</span>
                        <span className="font-semibold text-gray-800">
                          {reservations.filter(r => r.date && r.time).length} trạm
                        </span>
                      </div>
                      <div className="flex justify-between mb-2 text-sm">
                        <span className="text-gray-700">Phí mỗi trạm:</span>
                        <span className="font-semibold text-gray-800">150,000 VNĐ</span>
                      </div>
                      <div className="flex justify-between text-xl font-bold pt-2 border-t">
                        <span className="text-gray-800">Tổng cộng:</span>
                        <span className="text-blue-600">{totalCost.toLocaleString('vi-VN')} VNĐ</span>
                      </div>
                    </div>

                    <div className="space-y-3 pt-4">
                      <Link to="/driver/payment" className="block">
                        <Button 
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
                        >
                          <Zap className="h-5 w-5 mr-2" />
                          Tiến hành thanh toán
                        </Button>
                      </Link>
                      <p className="text-xs text-gray-500 text-center">
                        💡 Bạn có thể thanh toán toàn bộ hoặc đặt cọc để giữ chỗ
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
