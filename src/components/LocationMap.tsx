import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, ZoomIn, ZoomOut } from 'lucide-react';
import { toast } from 'sonner';

interface LocationMapProps {
  onLocationSelect: (address: string, coordinates: [number, number]) => void;
  initialCenter?: [number, number];
}

const LocationMap: React.FC<LocationMapProps> = ({ 
  onLocationSelect,
  initialCenter = [106.6297, 10.8231]
}) => {
  const [markerPosition, setMarkerPosition] = useState({ x: 50, y: 50 }); // Phần trăm
  const [selectedAddress, setSelectedAddress] = useState('');
  const mapRef = useRef<HTMLDivElement>(null);

  // Mock địa chỉ dựa trên vị trí click
  const getMockAddress = (x: number, y: number) => {
    const districts = [
      'Quận 1', 'Quận 3', 'Quận 5', 'Quận 7', 'Quận 10',
      'Bình Thạnh', 'Phú Nhuận', 'Tân Bình', 'Gò Vấp'
    ];
    const streets = [
      'Nguyễn Huệ', 'Lê Lợi', 'Võ Văn Tần', 'Trần Hưng Đạo',
      'Lê Văn Sỹ', 'Phan Xích Long', 'Cách Mạng Tháng 8'
    ];
    
    const districtIndex = Math.floor((x / 100) * districts.length);
    const streetIndex = Math.floor((y / 100) * streets.length);
    const number = Math.floor(Math.random() * 500) + 1;
    
    return `${number} ${streets[streetIndex]}, ${districts[districtIndex]}, TP.HCM`;
  };

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mapRef.current) return;
    
    const rect = mapRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setMarkerPosition({ x, y });
    const address = getMockAddress(x, y);
    setSelectedAddress(address);
    toast.success('Đã chọn vị trí: ' + address);
  };

  const handleConfirm = () => {
    if (!selectedAddress) {
      toast.error('Vui lòng chọn vị trí trên bản đồ');
      return;
    }
    
    const coordinates: [number, number] = [
      initialCenter[0] + (markerPosition.x - 50) * 0.01,
      initialCenter[1] + (50 - markerPosition.y) * 0.01
    ];
    
    onLocationSelect(selectedAddress, coordinates);
  };

  return (
    <div className="space-y-4">
      {/* Map Container */}
      <div 
        ref={mapRef}
        onClick={handleMapClick}
        className="relative w-full h-[500px] rounded-lg overflow-hidden cursor-crosshair border-2 border-gray-200 shadow-lg bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50"
      >
        {/* Mock Map Background */}
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full">
            {/* Grid lines */}
            {Array.from({ length: 20 }).map((_, i) => (
              <React.Fragment key={i}>
                <line
                  x1={`${i * 5}%`}
                  y1="0"
                  x2={`${i * 5}%`}
                  y2="100%"
                  stroke="#94a3b8"
                  strokeWidth="1"
                />
                <line
                  x1="0"
                  y1={`${i * 5}%`}
                  x2="100%"
                  y2={`${i * 5}%`}
                  stroke="#94a3b8"
                  strokeWidth="1"
                />
              </React.Fragment>
            ))}
          </svg>
        </div>

        {/* Mock Roads */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 right-0 h-2 bg-gray-400 opacity-40"></div>
          <div className="absolute top-1/2 left-0 right-0 h-3 bg-gray-500 opacity-50"></div>
          <div className="absolute top-3/4 left-0 right-0 h-2 bg-gray-400 opacity-40"></div>
          <div className="absolute left-1/4 top-0 bottom-0 w-2 bg-gray-400 opacity-40"></div>
          <div className="absolute left-1/2 top-0 bottom-0 w-3 bg-gray-500 opacity-50"></div>
          <div className="absolute left-3/4 top-0 bottom-0 w-2 bg-gray-400 opacity-40"></div>
        </div>

        {/* Mock Buildings */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-gray-300 opacity-20 rounded-sm"
            style={{
              left: `${Math.random() * 90 + 5}%`,
              top: `${Math.random() * 90 + 5}%`,
              width: `${Math.random() * 40 + 20}px`,
              height: `${Math.random() * 40 + 20}px`,
            }}
          ></div>
        ))}

        {/* Location Marker */}
        <div
          className="absolute transform -translate-x-1/2 -translate-y-full transition-all duration-200"
          style={{
            left: `${markerPosition.x}%`,
            top: `${markerPosition.y}%`,
          }}
        >
          <MapPin className="h-10 w-10 text-red-500 drop-shadow-lg animate-bounce" fill="currentColor" />
        </div>

        {/* Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <Button
            size="icon"
            variant="secondary"
            className="bg-white shadow-lg hover:bg-gray-100"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="bg-white shadow-lg hover:bg-gray-100"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="bg-white shadow-lg hover:bg-gray-100"
          >
            <Navigation className="h-4 w-4" />
          </Button>
        </div>

        {/* Instructions */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
          <p className="text-sm font-medium text-gray-700">
            Click vào bản đồ để chọn vị trí
          </p>
        </div>
      </div>

      {/* Selected Location Info */}
      {selectedAddress && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 mb-1">Vị trí đã chọn:</p>
              <p className="text-sm text-gray-700">{selectedAddress}</p>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Button */}
      <div className="flex justify-end">
        <Button 
          onClick={handleConfirm}
          disabled={!selectedAddress}
          className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 px-8"
        >
          <MapPin className="h-4 w-4 mr-2" />
          Xác nhận vị trí
        </Button>
      </div>
    </div>
  );
};

export default LocationMap;
