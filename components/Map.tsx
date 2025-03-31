"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Circle, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface ScamArea {
  name: string;
  coordinates: number[];
}

interface MapProps {
  center: number[];
  scamAreas: ScamArea[];
}

const Map: React.FC<MapProps> = ({ center, scamAreas }) => {
  // Define the icon
  useEffect(() => {
    // Make sure this only runs in the browser
    if (typeof window !== "undefined") {
      L.Icon.Default.mergeOptions({
        iconUrl: "/leaflet/marker-icon.png",
        shadowUrl: "/leaflet/marker-shadow.png",
      });
    }
  }, []);

  return (
    <MapContainer 
      center={[center[0], center[1]] as [number, number]} 
      zoom={13} 
      scrollWheelZoom={false} 
      className="w-full h-full"
    >
      {/* TileLayer for the base map */}
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Circles representing scam areas */}
      {scamAreas.map((area, index) => (
        <Circle
          key={index}
          center={area.coordinates as [number, number]}
          radius={400} // Adjust radius for each area
          pathOptions={{ color: "red", fillColor: "red", fillOpacity: 0.5 }}
        >
          <Popup>
            <h3>{area.name}</h3>
            <p>Scam reported in this area.</p>
          </Popup>
        </Circle>
      ))}
    </MapContainer>
  );
};

export default Map;