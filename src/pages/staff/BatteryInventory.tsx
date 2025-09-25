import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Battery, ArrowLeft, Search, Edit, Trash, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const BatteryInventory = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingBattery, setEditingBattery] = useState(null);
  
  // Form states for adding battery
  const [newBattery, setNewBattery] = useState({
    id: "",
    type: "",
    status: "empty",
    soh: "100",
    location: ""
  });

  // Form states for editing battery
  const [editBattery, setEditBattery] = useState({
    id: "",
    type: "",
    status: "",
    soh: "",
    location: ""
  });

  const batteries = [
    {
      id: "BAT001",
      type: "Lithium-ion",
      status: "full",
      soh: "95%",
      location: "Slot A1",
      lastUpdated: "15/12/2024 10:30"
    },
    {
      id: "BAT002", 
      type: "Pin LFP",
      status: "charging",
      soh: "92%",
      location: "Slot A2",
      lastUpdated: "15/12/2024 09:15"
    },
    {
      id: "BAT003",
      type: "Lithium-ion",
      status: "empty",
      soh: "88%",
      location: "Slot A3",
      lastUpdated: "15/12/2024 14:45"
    },
    {
      id: "BAT004",
      type: "Pin LFP",
      status: "full",
      soh: "97%",
      location: "Slot B1",
      lastUpdated: "15/12/2024 11:20"
    },
    {
      id: "BAT005",
      type: "Lithium-ion",
      status: "charging",
      soh: "91%",
      location: "Slot B2",
      lastUpdated: "15/12/2024 13:10"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "full":
        return <Badge className="bg-success text-white">Pin đầy</Badge>;
      case "charging":
        return <Badge className="bg-charging text-white">Đang sạc</Badge>;
      case "empty":
        return <Badge variant="secondary">Pin đang bảo trì</Badge>;
      default:
        return <Badge variant="outline">Không xác định</Badge>;
    }
  };

  const statusCounts = {
    full: batteries.filter(b => b.status === "full").length,
    charging: batteries.filter(b => b.status === "charging").length,
    empty: batteries.filter(b => b.status === "empty").length
  };

  const handleAddBattery = () => {
    toast({
      title: "Thêm pin thành công",
      description: `Pin ${newBattery.id} đã được thêm vào kho`,
    });
    setNewBattery({ id: "", type: "", status: "empty", soh: "100", location: "" });
    setIsAddDialogOpen(false);
  };

  const handleEditBattery = (battery) => {
    setEditingBattery(battery);
    setEditBattery({
      id: battery.id,
      type: battery.type,
      status: battery.status,
      soh: battery.soh.replace('%', ''),
      location: battery.location
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateBattery = () => {
    toast({
      title: "Cập nhật pin thành công",
      description: `Thông tin pin ${editBattery.id} đã được cập nhật`,
    });
    setIsEditDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Modern Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Battery className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-semibold text-foreground">Quản lý tồn kho pin</h1>
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
        {/* Modern Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-l-4 border-l-green-500 bg-card/50 hover:bg-card/80 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Pin đầy</p>
                  <p className="text-2xl font-bold text-foreground">{statusCounts.full}</p>
                </div>
                <Battery className="h-8 w-8 text-green-500 opacity-80" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-blue-500 bg-card/50 hover:bg-card/80 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Đang sạc</p>
                  <p className="text-2xl font-bold text-foreground">{statusCounts.charging}</p>
                </div>
                <Battery className="h-8 w-8 text-blue-500 opacity-80" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-orange-500 bg-card/50 hover:bg-card/80 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Bảo trì</p>
                  <p className="text-2xl font-bold text-foreground">{statusCounts.empty}</p>
                </div>
                <Battery className="h-8 w-8 text-orange-500 opacity-80" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-primary bg-card/50 hover:bg-card/80 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Tổng số</p>
                  <p className="text-2xl font-bold text-foreground">{batteries.length}</p>
                </div>
                <Battery className="h-8 w-8 text-primary opacity-80" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Actions */}
        <Card className="mb-6 bg-card/50">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm theo mã pin, loại pin..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-background"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[180px] bg-background">
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="full">Pin đầy</SelectItem>
                  <SelectItem value="charging">Đang sạc</SelectItem>
                  <SelectItem value="empty">Bảo trì</SelectItem>
                </SelectContent>
              </Select>
              
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Thêm pin
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Thêm pin mới</DialogTitle>
                    <DialogDescription>
                      Nhập thông tin chi tiết của pin mới để thêm vào kho
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="battery-id">Mã pin</Label>
                      <Input
                        id="battery-id"
                        value={newBattery.id}
                        onChange={(e) => setNewBattery({...newBattery, id: e.target.value})}
                        placeholder="BAT006"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="battery-type">Loại pin</Label>
                      <Select value={newBattery.type} onValueChange={(value) => setNewBattery({...newBattery, type: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn loại pin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Lithium-ion">Lithium-ion</SelectItem>
                          <SelectItem value="Pin LFP">Pin LFP</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="battery-status">Trạng thái</Label>
                      <Select value={newBattery.status} onValueChange={(value) => setNewBattery({...newBattery, status: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full">Pin đầy</SelectItem>
                          <SelectItem value="charging">Đang sạc</SelectItem>
                          <SelectItem value="empty">Bảo trì</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="battery-soh">SoH (%)</Label>
                        <Input
                          id="battery-soh"
                          type="number"
                          value={newBattery.soh}
                          onChange={(e) => setNewBattery({...newBattery, soh: e.target.value})}
                          placeholder="100"
                          min="0"
                          max="100"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="battery-location">Vị trí</Label>
                        <Input
                          id="battery-location"
                          value={newBattery.location}
                          onChange={(e) => setNewBattery({...newBattery, location: e.target.value})}
                          placeholder="Slot C1"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleAddBattery} className="flex-1">Thêm pin</Button>
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Hủy</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Modern Battery Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">
              Danh sách pin
              <span className="text-sm font-normal text-muted-foreground ml-2">({batteries.length} pin)</span>
            </h2>
          </div>

          <div className="grid gap-4">
            {batteries.map((battery) => (
              <Card key={battery.id} className="bg-card/50 hover:bg-card/80 transition-colors duration-200">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                    <div className="space-y-1">
                      <h3 className="font-semibold text-foreground">{battery.id}</h3>
                      <p className="text-sm text-muted-foreground">{battery.type}</p>
                    </div>

                    <div className="flex justify-start">
                      {getStatusBadge(battery.status)}
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
                      <p className="text-xs text-muted-foreground">Vị trí</p>
                      <p className="text-sm font-medium">{battery.location}</p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Cập nhật</p>
                      <p className="text-xs text-muted-foreground">{battery.lastUpdated}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleEditBattery(battery)}
                        className="hover:bg-muted"
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <Trash className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Modern Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Cập nhật thông tin pin</DialogTitle>
            <DialogDescription>
              Chỉnh sửa thông tin chi tiết của pin {editBattery.id}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-battery-id">Mã pin</Label>
              <Input
                id="edit-battery-id"
                value={editBattery.id}
                disabled
                className="bg-muted"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-battery-type">Loại pin</Label>
              <Select value={editBattery.type} onValueChange={(value) => setEditBattery({...editBattery, type: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Lithium-ion">Lithium-ion</SelectItem>
                  <SelectItem value="Pin LFP">Pin LFP</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-battery-status">Trạng thái</Label>
              <Select value={editBattery.status} onValueChange={(value) => setEditBattery({...editBattery, status: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full">Pin đầy</SelectItem>
                  <SelectItem value="charging">Đang sạc</SelectItem>
                  <SelectItem value="empty">Bảo trì</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-battery-soh">SoH (%)</Label>
                <Input
                  id="edit-battery-soh"
                  type="number"
                  value={editBattery.soh}
                  onChange={(e) => setEditBattery({...editBattery, soh: e.target.value})}
                  min="0"
                  max="100"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-battery-location">Vị trí</Label>
                <Input
                  id="edit-battery-location"
                  value={editBattery.location}
                  onChange={(e) => setEditBattery({...editBattery, location: e.target.value})}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleUpdateBattery} className="flex-1">Cập nhật</Button>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Hủy</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BatteryInventory;