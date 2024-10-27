// Map.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';

function Map({ pins, addPin }) {
  const map = useMap();

  const handleMapClick = async (e) => {
    const { lat, lng } = e.latlng;
    let address = '';

    // Fetch address from Nominatim API (optional)
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
      address = response.data.display_name;
    } catch (error) {
      console.error('Address fetch error:', error);
    }

    // Add pin with latitude, longitude, remarks, and address
    const newPin = {
      id: Date.now(),
      latitude: lat,
      longitude: lng,
      remarks: prompt('Enter remarks for the pin:'),
      address: address
    };
    addPin(newPin);
  };

  return (
    <MapContainer
      center={[20, 78]} // Centered around a location (adjust as needed)
      zoom={5}
      style={{ height: "100vh", width: "80%" }}
      whenCreated={(mapInstance) => mapInstance.on('click', handleMapClick)}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {pins.map(pin => (
        <Marker
          key={pin.id}
          position={[pin.latitude, pin.longitude]}
          icon={L.icon({ iconUrl: '/marker-icon.png', iconSize: [25, 41], iconAnchor: [12, 41] })}
        >
          <Popup>
            <div>
              <p><strong>Remarks:</strong> {pin.remarks}</p>
              <p><strong>Address:</strong> {pin.address}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;
