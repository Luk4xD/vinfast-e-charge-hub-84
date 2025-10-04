import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface LocationMapProps {
  onLocationSelect: (address: string, coordinates: [number, number]) => void;
  initialCenter?: [number, number];
}

const LocationMap: React.FC<LocationMapProps> = ({ 
  onLocationSelect,
  initialCenter = [106.6297, 10.8231] // Mặc định: TP.HCM
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [selectedCoordinates, setSelectedCoordinates] = useState<[number, number]>(initialCenter);

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: initialCenter,
      zoom: 13,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );

    // Add initial marker
    marker.current = new mapboxgl.Marker({
      draggable: true,
      color: '#3b82f6'
    })
      .setLngLat(initialCenter)
      .addTo(map.current);

    // Handle marker drag
    marker.current.on('dragend', () => {
      const lngLat = marker.current!.getLngLat();
      setSelectedCoordinates([lngLat.lng, lngLat.lat]);
      reverseGeocode(lngLat.lng, lngLat.lat);
    });

    // Handle map click
    map.current.on('click', (e) => {
      const { lng, lat } = e.lngLat;
      marker.current?.setLngLat([lng, lat]);
      setSelectedCoordinates([lng, lat]);
      reverseGeocode(lng, lat);
    });

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken, initialCenter]);

  const reverseGeocode = async (lng: number, lat: number) => {
    if (!mapboxToken) return;
    
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxToken}`
      );
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        const address = data.features[0].place_name;
        toast.success('Đã chọn vị trí: ' + address);
      }
    } catch (error) {
      console.error('Lỗi reverse geocode:', error);
    }
  };

  const handleConfirm = async () => {
    if (!mapboxToken) {
      toast.error('Vui lòng nhập Mapbox token');
      return;
    }

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${selectedCoordinates[0]},${selectedCoordinates[1]}.json?access_token=${mapboxToken}`
      );
      const data = await response.json();
      const address = data.features?.[0]?.place_name || 'Địa chỉ không xác định';
      
      onLocationSelect(address, selectedCoordinates);
      toast.success('Đã xác nhận vị trí!');
    } catch (error) {
      toast.error('Không thể lấy thông tin địa chỉ');
    }
  };

  return (
    <div className="space-y-4">
      {!mapboxToken ? (
        <div className="space-y-4 p-6 bg-blue-50 rounded-lg border border-blue-200">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Cần Mapbox Token</h3>
            <p className="text-sm text-gray-600 mb-4">
              Để sử dụng bản đồ, vui lòng nhập Mapbox public token của bạn. 
              Bạn có thể lấy token miễn phí tại{' '}
              <a 
                href="https://mapbox.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-medium"
              >
                mapbox.com
              </a>
            </p>
          </div>
          <div className="flex gap-2">
            <Input 
              type="text"
              placeholder="Nhập Mapbox public token..."
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              className="flex-1"
            />
            <Button onClick={() => mapboxToken && toast.success('Token đã được lưu!')}>
              Xác nhận
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div 
            ref={mapContainer} 
            className="w-full h-[500px] rounded-lg shadow-lg border border-gray-200"
          />
          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">
              <p className="font-medium text-gray-900 mb-1">Hướng dẫn:</p>
              <p>• Click vào bản đồ hoặc kéo marker để chọn vị trí</p>
              <p>• Tọa độ hiện tại: {selectedCoordinates[1].toFixed(4)}, {selectedCoordinates[0].toFixed(4)}</p>
            </div>
            <Button 
              onClick={handleConfirm}
              className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
            >
              Xác nhận vị trí
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default LocationMap;
