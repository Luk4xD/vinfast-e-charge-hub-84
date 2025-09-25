import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Search, ArrowLeft, AlertTriangle, CheckCircle, Wrench, Clock, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const BatteryInspection = () => {
  const { toast } = useToast();
  const [selectedBattery, setSelectedBattery] = useState(null);
  const [showFullHistory, setShowFullHistory] = useState(false);

  const emptyBatteries = [
    {
      id: "BAT005",
      type: "Lithium-ion",
      lastUsed: "14/12/2024 16:30",
      location: "Slot A3",
      soh: "78%",
      cycles: 345
    },
    {
      id: "BAT009",
      type: "Pin LFP", 
      lastUsed: "14/12/2024 15:20",
      location: "Slot B3",
      soh: "75%",
      cycles: 389
    },
    {
      id: "BAT014",
      type: "Lithium-ion",
      lastUsed: "14/12/2024 14:10",
      location: "Slot C2",
      soh: "72%",
      cycles: 467
    }
  ];

  const inspectionHistory = [
    {
      id: "BAT001",
      type: "Lithium-ion",
      inspectionDate: "14/12/2024 10:30",
      inspector: "Nguyễn Văn A",
      physicalCondition: "Tốt",
      notes: "Pin trong tình trạng bình thường",
      status: "Đạt chuẩn"
    },
    {
      id: "BAT003",
      type: "Pin LFP",
      inspectionDate: "14/12/2024 09:15",
      inspector: "Trần Thị B",
      physicalCondition: "Có dấu hiệu ăn mòn nhẹ",
      notes: "Cần theo dõi thêm",
      status: "Bảo trì"
    },
    {
      id: "BAT007",
      type: "Lithium-ion",
      inspectionDate: "13/12/2024 16:45",
      inspector: "Nguyễn Văn A",
      physicalCondition: "Tốt",
      notes: "Pin hoạt động ổn định",
      status: "Đạt chuẩn"
    }
  ];

  const fullInspectionHistory = [
    ...inspectionHistory,
    {
      id: "BAT010",
      type: "Pin LFP",
      inspectionDate: "13/12/2024 14:20",
      inspector: "Trần Thị B",
      physicalCondition: "Tốt",
      notes: "Pin trong tình trạng tốt",
      status: "Đạt chuẩn"
    },
    {
      id: "BAT012",
      type: "Lithium-ion",
      inspectionDate: "13/12/2024 11:30",
      inspector: "Nguyễn Văn A",
      physicalCondition: "Có vết xước nhẹ",
      notes: "Vết xước không ảnh hưởng đến hoạt động",
      status: "Đạt chuẩn"
    },
    {
      id: "BAT008",
      type: "Pin LFP",
      inspectionDate: "12/12/2024 15:45",
      inspector: "Trần Thị B",
      physicalCondition: "Hư hại nặng",
      notes: "Pin bị phồng, cần thay thế",
      status: "Bảo trì"
    },
    {
      id: "BAT015",
      type: "Lithium-ion",
      inspectionDate: "12/12/2024 13:10",
      inspector: "Nguyễn Văn A",
      physicalCondition: "Tốt",
      notes: "Pin hoạt động bình thường",
      status: "Đạt chuẩn"
    },
    {
      id: "BAT002",
      type: "Pin LFP",
      inspectionDate: "12/12/2024 09:30",
      inspector: "Trần Thị B",
      physicalCondition: "Tốt",
      notes: "Pin trong tình trạng tốt",
      status: "Đạt chuẩn"
    },
    {
      id: "BAT006",
      type: "Lithium-ion",
      inspectionDate: "11/12/2024 16:20",
      inspector: "Nguyễn Văn A",
      physicalCondition: "Có dấu hiệu ăn mòn",
      notes: "Cần theo dõi và bảo trì định kỳ",
      status: "Bảo trì"
    },
    {
      id: "BAT011",
      type: "Pin LFP",
      inspectionDate: "11/12/2024 14:15",
      inspector: "Trần Thị B",
      physicalCondition: "Tốt",
      notes: "Pin hoạt động ổn định",
      status: "Đạt chuẩn"
    }
  ];

  const displayedHistory = showFullHistory ? fullInspectionHistory : inspectionHistory;

  const staffList = ["Nguyễn Văn A", "Trần Thị B"];

  const InspectionForm = ({ battery, onClose }) => {
    const [physicalCondition, setPhysicalCondition] = useState("");
    const [notes, setNotes] = useState("");
    const [inspector, setInspector] = useState("");

    const handleSubmit = () => {
      toast({
        title: "Kiểm tra pin thành công",
        description: `Pin ${battery.id} đã được kiểm tra bởi ${inspector}`,
      });
      onClose();
    };

    const handleSendMaintenance = () => {
      toast({
        title: "Gửi pin bảo trì thành công",
        description: `Pin ${battery.id} đã được chuyển sang trạng thái bảo trì`,
      });
      onClose();
    };

    return (
      <div className="space-y-4">
        <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg">
          <h3 className="font-semibold mb-3 text-foreground">Thông tin pin: {battery.id}</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="space-y-1">
              <span className="text-muted-foreground">Loại:</span>
              <p className="font-medium">{battery.type}</p>
            </div>
            <div className="space-y-1">
              <span className="text-muted-foreground">SoH:</span>
              <p className="font-medium">{battery.soh}</p>
            </div>
            <div className="space-y-1">
              <span className="text-muted-foreground">Chu kỳ:</span>
              <p className="font-medium">{battery.cycles}</p>
            </div>
            <div className="space-y-1">
              <span className="text-muted-foreground">Vị trí:</span>
              <p className="font-medium">{battery.location}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="physical">Tình trạng vật lý</Label>
            <Textarea
              id="physical"
              placeholder="Mô tả tình trạng vật lý của pin..."
              value={physicalCondition}
              onChange={(e) => setPhysicalCondition(e.target.value)}
              className="min-h-[80px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Ghi chú về pin</Label>
            <Textarea
              id="notes"
              placeholder="Ghi chú thêm về pin..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[80px]"
            />
          </div>

          <div className="space-y-2">
            <Label>Người thực hiện kiểm tra</Label>
            <Select value={inspector} onValueChange={setInspector}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn nhân viên kiểm tra" />
              </SelectTrigger>
              <SelectContent>
                {staffList.map((staff) => (
                  <SelectItem key={staff} value={staff}>
                    {staff}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-2 pt-4">
          <Button 
            className="flex-1"
            onClick={handleSubmit}
            disabled={!physicalCondition || !notes || !inspector}
          >
            Hoàn thành kiểm tra
          </Button>
          <Button 
            variant="destructive" 
            className="flex-1"
            onClick={handleSendMaintenance}
            disabled={!inspector}
          >
            Gửi bảo trì
          </Button>
          <Button variant="outline" onClick={onClose}>
            Hủy
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Modern Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Search className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-semibold text-foreground">Kiểm tra & Giám định pin</h1>
            </div>
            <Link to="/staff">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Quay lại
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Inspection Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-l-4 border-l-orange-500 bg-card/50 hover:bg-card/80 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Cần kiểm tra</p>
                  <p className="text-2xl font-bold text-foreground">3</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-orange-500 opacity-80" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-red-500 bg-card/50 hover:bg-card/80 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Gửi bảo trì</p>
                  <p className="text-2xl font-bold text-foreground">2</p>
                </div>
                <Wrench className="h-8 w-8 text-red-500 opacity-80" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-green-500 bg-card/50 hover:bg-card/80 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Đạt chuẩn</p>
                  <p className="text-2xl font-bold text-foreground">8</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500 opacity-80" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Batteries Requiring Inspection */}
        <Card className="mb-6 bg-card/50">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Pin cần kiểm tra</CardTitle>
            <CardDescription>
              Danh sách pin cần được kiểm tra tình trạng
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {emptyBatteries.map((battery) => (
                <Card key={battery.id} className="bg-background/50 hover:bg-background/80 transition-colors">
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                      <div className="space-y-1">
                        <h3 className="font-semibold text-foreground">{battery.id}</h3>
                        <p className="text-sm text-muted-foreground">{battery.type}</p>
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Vị trí</p>
                        <p className="text-sm font-medium">{battery.location}</p>
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">SoH</p>
                        <p className={`font-semibold ${
                          parseInt(battery.soh) > 90 ? 'text-green-600' : 
                          parseInt(battery.soh) > 80 ? 'text-orange-500' : 'text-red-500'
                        }`}>
                          {battery.soh}
                        </p>
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Chu kỳ</p>
                        <p className="text-sm font-medium">{battery.cycles}</p>
                      </div>
                      
                      <div className="flex justify-end">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              size="sm"
                              onClick={() => setSelectedBattery(battery)}
                              className="bg-primary hover:bg-primary/90"
                            >
                              <Search className="h-4 w-4 mr-2" />
                              Kiểm tra
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>Kiểm tra pin {battery.id}</DialogTitle>
                              <DialogDescription>
                                Thực hiện kiểm tra tình trạng pin
                              </DialogDescription>
                            </DialogHeader>
                            {selectedBattery && (
                              <InspectionForm 
                                battery={selectedBattery} 
                                onClose={() => setSelectedBattery(null)}
                              />
                            )}
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Inspection History */}
        <Card className="mb-6 bg-card/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">Lịch sử kiểm tra pin</CardTitle>
                <CardDescription>
                  {showFullHistory ? "Lịch sử tổng hợp tất cả pin đã kiểm tra" : "Danh sách pin đã được kiểm tra gần đây"}
                </CardDescription>
              </div>
              <Button 
                variant="outline" 
                onClick={() => setShowFullHistory(!showFullHistory)}
                className="bg-background hover:bg-muted"
              >
                {showFullHistory ? "Thu gọn" : "Xem tổng hợp"}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {displayedHistory.map((record) => (
                <Card key={record.id} className="bg-background/50">
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
                      <div className="space-y-1">
                        <h3 className="font-semibold text-foreground">{record.id}</h3>
                        <p className="text-sm text-muted-foreground">{record.type}</p>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          {record.inspectionDate}
                        </div>
                        <div className="flex items-center text-xs">
                          <User className="h-3 w-3 mr-1" />
                          {record.inspector}
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-muted-foreground">Tình trạng</p>
                        <p className="text-sm">{record.physicalCondition}</p>
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-muted-foreground">Ghi chú</p>
                        <p className="text-sm">{record.notes}</p>
                      </div>
                      
                      <div className="flex justify-end">
                        <Badge 
                          variant={record.status === "Đạt chuẩn" ? "default" : "destructive"}
                          className="text-xs"
                        >
                          {record.status}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BatteryInspection;