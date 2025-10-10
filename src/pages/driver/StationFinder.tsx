import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { MapPin, ArrowLeft, Battery, Filter, Map, Navigation, Zap, Clock, Star } from "lucide-react";
import { Link } from "react-router-dom";
import LocationMap from "@/components/LocationMap";

const StationFinder = () => {
  const [filters, setFilters] = useState({
    distance: "",
    batteryCount: ""
  });
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("123 Lê Lợi, Quận 1, TP.HCM");
  const [selectedBatteries, setSelectedBatteries] = useState<Record<number, Record<string, number>>>({});

  const handleLocationSelect = (address: string, coordinates: [number, number]) => {
    setSelectedLocation(address);
    setIsMapOpen(false);
  };

  const handleBatteryClick = (stationId: number, batteryType: string) => {
    setSelectedBatteries(prev => {
      const stationBatteries = prev[stationId] || {};
      if (stationBatteries[batteryType]) {
        // Already selected, remove it
        const { [batteryType]: _, ...rest } = stationBatteries;
        return { ...prev, [stationId]: rest };
      } else {
        // Not selected, add it with quantity 1
        return { ...prev, [stationId]: { ...stationBatteries, [batteryType]: 1 } };
      }
    });
  };

  const updateBatteryQuantity = (stationId: number, batteryType: string, delta: number) => {
    setSelectedBatteries(prev => {
      const stationBatteries = prev[stationId] || {};
      const currentQuantity = stationBatteries[batteryType] || 0;
      const newQuantity = Math.max(0, currentQuantity + delta);
      
      if (newQuantity === 0) {
        const { [batteryType]: _, ...rest } = stationBatteries;
        return { ...prev, [stationId]: rest };
      }
      
      return { ...prev, [stationId]: { ...stationBatteries, [batteryType]: newQuantity } };
    });
  };

  const mockStations = [
    {
      id: 1,
      name: "Trạm Quận 1 Premium",
      address: "123 Nguyễn Huệ, Quận 1, TP.HCM",
      distance: "2.5 km",
      batteries: { full: 8, charging: 3, empty: 1 },
      batteryTypes: {
        "Lithium-ion": { full: 5, charging: 2, empty: 1 },
        "Pin LFP": { full: 3, charging: 1, empty: 0 },
        "Ắc quy chì": { full: 0, charging: 0, empty: 0 }
      },
      status: "Hoạt động",
      rating: 4.9,
      estimatedTime: "2 phút",
      amenities: ["WiFi", "Cà phê", "Chỗ đậu xe"]
    },
    {
      id: 2,
      name: "Trạm Quận 3 Express",
      address: "456 Lê Văn Sỹ, Quận 3, TP.HCM",
      distance: "4.2 km",
      batteries: { full: 5, charging: 5, empty: 2 },
      batteryTypes: {
        "Lithium-ion": { full: 3, charging: 3, empty: 1 },
        "Pin LFP": { full: 2, charging: 2, empty: 1 },
        "Ắc quy chì": { full: 0, charging: 0, empty: 0 }
      },
      status: "Hoạt động",
      rating: 4.7,
      estimatedTime: "5 phút",
      amenities: ["24/7", "An ninh"]
    },
    {
      id: 3,
      name: "Trạm Bình Thạnh Mega",
      address: "789 Xô Viết Nghệ Tĩnh, Bình Thạnh, TP.HCM",
      distance: "6.1 km",
      batteries: { full: 12, charging: 2, empty: 1 },
      batteryTypes: {
        "Lithium-ion": { full: 8, charging: 1, empty: 1 },
        "Pin LFP": { full: 4, charging: 1, empty: 0 },
        "Ắc quy chì": { full: 0, charging: 0, empty: 0 }
      },
      status: "Hoạt động",
      rating: 4.8,
      estimatedTime: "3 phút",
      amenities: ["Siêu sạc", "Rửa xe", "Cửa hàng tiện lợi"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b">
        <div className="container mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-foreground">Tìm trạm</h1>
        </div>
      </header>
      
      {/* Main Content with Better Spacing */}
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Search & Filters */}
          <div className="lg:col-span-1 space-y-6">
            {/* Location Search Card */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-lg font-semibold">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg mr-3">
                    <Navigation className="h-5 w-5 text-white" />
                  </div>
                  Vị trí của bạn
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Input 
                    placeholder="Nhập địa chỉ hoặc chọn trên bản đồ..." 
                    className="pl-12 pr-4 py-3 bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl text-sm"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <Button 
                  onClick={() => setIsMapOpen(true)}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-xl py-3 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  <Map className="h-4 w-4 mr-2" />
                  Chọn trên bản đồ
                </Button>
              </CardContent>
            </Card>

            {/* Enhanced Filters */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-lg font-semibold">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mr-3">
                    <Filter className="h-5 w-5 text-white" />
                  </div>
                  Bộ lọc tìm kiếm
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-semibold mb-3 block text-gray-700">Khoảng cách</label>
                  <Select onValueChange={(value) => setFilters({...filters, distance: value})}>
                    <SelectTrigger className="bg-gray-50 border-gray-200 focus:border-purple-500 rounded-xl">
                      <SelectValue placeholder="Chọn khoảng cách" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">📍 Dưới 1 km</SelectItem>
                      <SelectItem value="5">🚗 Dưới 5 km</SelectItem>
                      <SelectItem value="10">🏃 Dưới 10 km</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-semibold mb-3 block text-gray-700">Số lượng pin</label>
                  <Select onValueChange={(value) => setFilters({...filters, batteryCount: value})}>
                    <SelectTrigger className="bg-gray-50 border-gray-200 focus:border-purple-500 rounded-xl">
                      <SelectValue placeholder="Chọn số lượng pin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">🔋 Trên 5 pin</SelectItem>
                      <SelectItem value="10">🔋🔋 Trên 10 pin</SelectItem>
                      <SelectItem value="15">🔋🔋🔋 Trên 15 pin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats Card */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-green-50 to-emerald-50">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Thống kê nhanh</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Trạm gần nhất</span>
                    <span className="font-semibold text-green-600">2.5 km</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Pin có sẵn</span>
                    <span className="font-semibold text-blue-600">25 pin</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Thời gian ước tính</span>
                    <span className="font-semibold text-purple-600">2-5 phút</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Station List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Trạm pin gần bạn</h2>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
                {mockStations.length} trạm tìm thấy
              </Badge>
            </div>

            {/* Enhanced Station Cards */}
            <div className="space-y-6">
              {mockStations.map((station, index) => (
                <Card 
                  key={station.id} 
                  className="border-0 shadow-xl bg-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 overflow-hidden group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Card Header with Gradient */}
                  <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                  
                  <CardContent className="p-8">
                    {/* Station Header */}
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-8 gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3">
                          <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                            <Zap className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-1">{station.name}</h3>
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`h-4 w-4 ${i < Math.floor(station.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                                  />
                                ))}
                              </div>
                              <span className="text-sm font-semibold text-yellow-600">{station.rating}</span>
                              <span className="text-sm text-gray-500">• 128 đánh giá</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2 text-sm text-gray-600">
                          <p className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            {station.address}
                          </p>
                          <div className="flex items-center gap-6">
                            <span className="flex items-center gap-1 font-medium text-blue-600">
                              <Navigation className="h-4 w-4" />
                              {station.distance}
                            </span>
                            <span className="flex items-center gap-1 font-medium text-green-600">
                              <Clock className="h-4 w-4" />
                              {station.estimatedTime}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <Badge 
                        variant="secondary" 
                        className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-4 py-2 rounded-full font-semibold"
                      >
                        ✅ {station.status}
                      </Badge>
                    </div>

                    {/* Battery Information Section - Combined */}
                    <div className="mb-6">
                      {/* Header with Total Batteries */}
                      <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
                        <h4 className="text-base font-semibold text-gray-800 flex items-center gap-2">
                          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                            <Battery className="h-4 w-4 text-white" />
                          </div>
                          Thông tin pin
                        </h4>
                        <Badge 
                          variant="secondary" 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm px-4 py-1.5 rounded-full font-semibold"
                        >
                          <Battery className="h-3.5 w-3.5 mr-1.5 inline" />
                          {station.batteries.full + station.batteries.charging} pin
                        </Badge>
                      </div>

                      {/* Battery Types List */}
                      <div className="space-y-2.5">
                        {Object.entries(station.batteryTypes)
                          .filter(([_, counts]) => counts.full > 0 || counts.charging > 0)
                          .map(([type, counts]) => {
                            const isSelected = selectedBatteries[station.id]?.[type] > 0;
                            const selectedQuantity = selectedBatteries[station.id]?.[type] || 0;
                            
                            return (
                              <div 
                                key={type} 
                                className="relative"
                              >
                                <div 
                                  onClick={() => handleBatteryClick(station.id, type)}
                                  className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-300 cursor-pointer ${
                                    isSelected 
                                      ? 'bg-gradient-to-r from-blue-100 to-purple-100 border-blue-400 shadow-lg' 
                                      : 'bg-gradient-to-r from-white to-blue-50/50 border-blue-100 hover:border-blue-300 hover:shadow-md'
                                  }`}
                                >
                                  {/* Battery Type Name or Selected Quantity */}
                                  <div className="flex items-center gap-2 flex-1">
                                    <div className={`p-1.5 rounded-md transition-all duration-300 ${
                                      type === "Lithium-ion" ? "bg-gradient-to-r from-blue-400 to-blue-600" : 
                                      type === "Pin LFP" ? "bg-gradient-to-r from-purple-400 to-purple-600" : 
                                      "bg-gradient-to-r from-orange-400 to-orange-600"
                                    }`}>
                                      <Battery className="h-3.5 w-3.5 text-white" />
                                    </div>
                                    <span className={`font-semibold text-sm transition-all duration-300 ${
                                      isSelected ? 'text-blue-700' : 'text-gray-800'
                                    }`}>
                                      {isSelected ? `Số lượng đặt pin: ${selectedQuantity}` : type}
                                    </span>
                                  </div>

                                  {/* Battery Counts - only show when not selected */}
                                  {!isSelected && (
                                    <div className="flex items-center gap-3">
                                      {/* Full Batteries */}
                                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-md border border-green-200">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                        <span className="text-xs font-medium text-gray-600">Đầy:</span>
                                        <span className="text-sm font-bold text-green-600">{counts.full}</span>
                                      </div>

                                      {/* Charging Batteries */}
                                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-md border border-blue-200">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                        <span className="text-xs font-medium text-gray-600">Sạc:</span>
                                        <span className="text-sm font-bold text-blue-600">{counts.charging}</span>
                                      </div>
                                    </div>
                                  )}
                                </div>

                                {/* +/- Buttons - show when selected */}
                                {isSelected && (
                                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 animate-fade-in">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        updateBatteryQuantity(station.id, type, -1);
                                      }}
                                      className="w-8 h-8 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold text-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg"
                                    >
                                      −
                                    </button>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        updateBatteryQuantity(station.id, type, 1);
                                      }}
                                      className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg"
                                    >
                                      +
                                    </button>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                      </div>
                    </div>

                    {/* Total Battery Progress Bar */}
                    <div className="mb-6">
                      {(() => {
                        const totalFull = Object.values(station.batteryTypes).reduce((sum, counts) => sum + counts.full, 0);
                        const totalBatteries = Object.values(station.batteryTypes).reduce((sum, counts) => sum + counts.full + counts.charging + counts.empty, 0);
                        const percentage = totalBatteries > 0 ? (totalFull / totalBatteries) * 100 : 0;
                        
                        return (
                          <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-semibold text-gray-700">Tình trạng pin sẵn sàng</span>
                              <span className="text-sm font-bold text-green-700">{totalFull}/{totalBatteries} pin đầy</span>
                            </div>
                            <Progress 
                              value={percentage} 
                              className="h-3 bg-green-100"
                            />
                          </div>
                        );
                      })()}
                    </div>

                    {/* Amenities */}
                    <div className="mb-8">
                      <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                        ⭐ Tiện ích & Dịch vụ
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {station.amenities.map((amenity, idx) => (
                          <Badge 
                            key={idx} 
                            variant="outline" 
                            className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-blue-200 hover:bg-blue-100 transition-colors px-3 py-1 rounded-full"
                          >
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                      <Link to="/driver/reservation" className="flex-1">
                        <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                          <Battery className="h-5 w-5 mr-3" />
                          Đặt lịch ngay
                        </Button>
                      </Link>
                      <Button 
                        variant="outline" 
                        className="px-8 py-4 border-2 border-blue-200 text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 hover:scale-105 font-semibold"
                      >
                        <MapPin className="h-5 w-5 mr-2" />
                        Chỉ đường
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Map Dialog */}
      <Dialog open={isMapOpen} onOpenChange={setIsMapOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Chọn vị trí trên bản đồ</DialogTitle>
          </DialogHeader>
          <LocationMap 
            onLocationSelect={handleLocationSelect}
            initialCenter={[106.6297, 10.8231]}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StationFinder;