'use client';
import L from 'leaflet';
import { useEffect, useRef } from 'react';

import 'leaflet/dist/leaflet.css';

interface MapDisplayProps {
  lat: string;
  lng: string;
}

export function MapDisplay({ lat, lng }: MapDisplayProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    // Dynamically import Leaflet to ensure it’s loaded
    import('leaflet').then((L) => {
      const mapElement = mapRef.current;
      if (!mapElement) return;

      // Parse coordinates with fallback
      const validLat = parseFloat(lat) || 0;
      const validLng = parseFloat(lng) || 0;

      // Initialize map if it doesn't exist
      if (!mapInstanceRef.current) {
        mapInstanceRef.current = L.map(mapElement).setView(
          [validLat, validLng],
          13,
        );

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution:
            '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(mapInstanceRef.current);

        // Custom icon
        const icon = L.icon({
          iconUrl:
            'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
          shadowUrl:
            'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        });

        // Add marker
        markerRef.current = L.marker([validLat, validLng], {
          icon,
        }).addTo(mapInstanceRef.current);
      } else {
        // Update view and marker position
        mapInstanceRef.current.setView([validLat, validLng], 13);
        if (markerRef.current) {
          markerRef.current.setLatLng([validLat, validLng]);
        }
      }
    });

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markerRef.current = null;
      }
    };
  }, [lat, lng]);

  return (
    <div
      ref={mapRef}
      className='h-[200px] w-full rounded-md border border-gray-300 mt-2'
    />
  );
}
