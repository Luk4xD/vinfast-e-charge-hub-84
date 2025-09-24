import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MapPin, ArrowLeft, Battery, Filter, Map, Navigation, Zap, Clock, Star } from "lucide-react";
import { Link } from "react-router-dom";

const StationFinder = () => {
  const [filters, setFilters] = useState({
    distance: "",
    batteryCount: ""
  });

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

  const getBatteryStatusColor = (type: string, count: number) => {
    if (type === "full" && count > 0) return "text-success";
    if (type === "charging" && count > 0) return "text-charging";
    return "text-muted-foreground";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-electric-blue-light via-background to-accent/30">
      {/* Enhanced Header */}
      <header className="bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full bg-repeat" style={{
            backgroundImage: `url('data:image/svg+xml,<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="%23ffffff" fill-opacity="0.1"><circle cx="30" cy="30" r="2"/></g></g></svg>')`
          }}></div>
        </div>
        <div className="container mx-auto p-6 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 animate-fade-in">
              <div className="relative">
                <MapPin className="h-8 w-8 text-white animate-float" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-pulse-glow"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Tìm trạm thông minh</h1>
                <p className="text-white/80 text-sm">Khám phá trạm pin gần nhất với bạn</p>
              </div>
            </div>
            <Link to="/driver">
              <Button variant="ghost" className="text-white hover:bg-white/20 glass-effect animate-slide-in-right">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Quay lại
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6 space-y-8">
        {/* Enhanced Location Card */}
        <Card className="card-gradient hover-lift animate-fade-in border-0 shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-primary">
              <Navigation className="h-6 w-6 mr-3 animate-pulse-glow" />
              Vị trí hiện tại
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Input 
                  placeholder="Địa chỉ hiện tại..." 
                  className="pr-12 bg-white/50 border-primary/20 focus:border-primary focus:bg-white transition-all duration-300"
                  defaultValue="123 Lê Lợi, Quận 1, TP.HCM"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Zap className="h-4 w-4 text-primary animate-pulse" />
                </div>
              </div>
              <Button className="bg-gradient-electric hover:scale-105 transition-all duration-300 shadow-lg">
                <Map className="h-4 w-4 mr-2" />
                Chọn trên bản đồ
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Filters */}
        <Card className="card-gradient hover-lift animate-slide-up border-0 shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-primary">
              <Filter className="h-6 w-6 mr-3" />
              Bộ lọc thông minh
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="animate-slide-in-right" style={{ animationDelay: '0.1s' }}>
                <label className="text-sm font-semibold mb-3 block text-primary">Khoảng cách</label>
                <Select onValueChange={(value) => setFilters({...filters, distance: value})}>
                  <SelectTrigger className="bg-white/50 border-primary/20 hover:border-primary transition-all duration-300">
                    <SelectValue placeholder="Tất cả khoảng cách" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Dưới 1 km</SelectItem>
                    <SelectItem value="5">Dưới 5 km</SelectItem>
                    <SelectItem value="10">Dưới 10 km</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
                <label className="text-sm font-semibold mb-3 block text-primary">Số lượng pin</label>
                <Select onValueChange={(value) => setFilters({...filters, batteryCount: value})}>
                  <SelectTrigger className="bg-white/50 border-primary/20 hover:border-primary transition-all duration-300">
                    <SelectValue placeholder="Tất cả số lượng" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">Trên 5 pin</SelectItem>
                    <SelectItem value="10">Trên 10 pin</SelectItem>
                    <SelectItem value="15">Trên 15 pin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Station List */}
        <div className="space-y-6 animate-scale-in">
          {mockStations.map((station, index) => (
            <Card 
              key={station.id} 
              className="card-gradient hover-lift border-0 shadow-xl overflow-hidden relative group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-electric"></div>
              <CardContent className="p-8">
                {/* Station Header */}
                <div className="flex justify-between items-start mb-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-2xl font-bold bg-gradient-electric bg-clip-text text-transparent">
                        {station.name}
                      </h3>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-warning text-warning" />
                        <span className="text-sm font-semibold text-warning">{station.rating}</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {station.address}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1 text-primary font-medium">
                        <Navigation className="h-4 w-4" />
                        Cách {station.distance}
                      </span>
                      <span className="flex items-center gap-1 text-success font-medium">
                        <Clock className="h-4 w-4" />
                        {station.estimatedTime}
                      </span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-gradient-success text-white px-4 py-2 font-semibold">
                    {station.status}
                  </Badge>
                </div>

                {/* Battery Status Grid */}
                <div className="grid lg:grid-cols-2 gap-8 mb-6">
                  {/* Battery Counts */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-primary">Trạng thái pin</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 rounded-xl bg-gradient-success/10 border border-success/20">
                        <div className={`text-3xl font-bold mb-1 ${getBatteryStatusColor("full", station.batteries.full)}`}>
                          {station.batteries.full}
                        </div>
                        <div className="text-xs text-success font-medium">Pin đầy</div>
                        <div className="w-full h-2 bg-success/20 rounded-full mt-2">
                          <div className="h-full bg-gradient-success rounded-full" style={{ width: '100%' }}></div>
                        </div>
                      </div>
                      <div className="text-center p-4 rounded-xl bg-gradient-electric/10 border border-charging/20">
                        <div className={`text-3xl font-bold mb-1 ${getBatteryStatusColor("charging", station.batteries.charging)}`}>
                          {station.batteries.charging}
                        </div>
                        <div className="text-xs text-charging font-medium">Đang sạc</div>
                        <div className="w-full h-2 bg-charging/20 rounded-full mt-2">
                          <div className="h-full bg-gradient-electric rounded-full animate-pulse" style={{ width: '75%' }}></div>
                        </div>
                      </div>
                      <div className="text-center p-4 rounded-xl bg-muted/50 border border-muted">
                        <div className={`text-3xl font-bold mb-1 ${getBatteryStatusColor("empty", station.batteries.empty)}`}>
                          {station.batteries.empty}
                        </div>
                        <div className="text-xs text-muted-foreground font-medium">Pin rỗng</div>
                        <div className="w-full h-2 bg-muted rounded-full mt-2">
                          <div className="h-full bg-muted-foreground/30 rounded-full" style={{ width: '20%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Battery Types */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-primary">Loại pin có sẵn</h4>
                    <div className="space-y-3">
                      {Object.entries(station.batteryTypes).map(([type, counts]) => (
                        counts.full > 0 && (
                          <div key={type} className="flex items-center justify-between p-3 rounded-lg bg-white/50 border border-primary/10">
                            <div className="flex items-center gap-3">
                              <Battery className={`h-5 w-5 ${type === "Lithium-ion" ? "text-electric-blue" : "text-primary"}`} />
                              <span className={`font-medium ${type === "Lithium-ion" ? "text-electric-blue" : ""}`}>
                                {type}
                              </span>
                            </div>
                            <Badge variant="secondary" className="bg-gradient-success text-white font-semibold">
                              {counts.full} pin
                            </Badge>
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                </div>

                {/* Amenities */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-primary mb-3">Tiện ích</h4>
                  <div className="flex flex-wrap gap-2">
                    {station.amenities.map((amenity, idx) => (
                      <Badge key={idx} variant="outline" className="bg-primary/5 text-primary border-primary/20 hover:bg-primary/10 transition-colors">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <Link to="/driver/reservation" className="flex-1">
                    <Button className="w-full bg-gradient-electric hover:scale-105 transition-all duration-300 shadow-lg text-lg py-6">
                      <Battery className="h-5 w-5 mr-3" />
                      Đặt lịch ngay
                    </Button>
                  </Link>
                  <Button variant="outline" className="px-8 hover:scale-105 transition-all duration-300 border-primary text-primary hover:bg-primary/10">
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
  );
};

export default StationFinder;