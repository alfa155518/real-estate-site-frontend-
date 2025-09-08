'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// إصلاح الأيقونات الافتراضية للـ Marker في Next.js
const defaultIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface PropertyMapProps {
  lat: number;
  lng: number;
  zoom: number;
  propertyTitle: string;
}

const PropertyMap: React.FC<PropertyMapProps> = ({ lat, lng, zoom, propertyTitle }) => {
  const position: [number, number] = [lat, lng];

  return (
    <MapContainer
      center={position}
      zoom={zoom}
      scrollWheelZoom={false}
      style={{ width: '100%', height: '100%', minHeight: '300px', borderRadius: '0 0 12px 12px' }}
    >
      {/* خريطة OpenStreetMap */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* الماركر */}
      <Marker position={position} icon={defaultIcon}>
        <Popup>
          <b>{propertyTitle}</b>
          <br />
          {lat}, {lng}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default PropertyMap;
