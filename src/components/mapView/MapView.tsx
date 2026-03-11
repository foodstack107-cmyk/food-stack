'use client';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import L from 'leaflet';
import { useEffect, useRef } from 'react';

dayjs.extend(utc);
dayjs.extend(timezone);

delete (L.Icon.Default.prototype as { _getIconUrl?: () => string })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Event {
  startDate: string;
  endDate?: string;
  timezone?: string;
  location: string;
  coordinates: {
    lat: string;
    lng: string;
  };
  time: {
    startTime: string;
    endTime: string;
  };
  phoneNumber: string;
}

interface MapViewProps {
  events: Event[];
}

export default function MapView({ events }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const timer = setTimeout(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }

      const center =
        events.length > 0
          ? [
              parseFloat(events[0].coordinates.lat),
              parseFloat(events[0].coordinates.lng),
            ]
          : [0, 0];

      if (!mapRef.current) return;

      const map = L.map(mapRef.current, {
        center: center as L.LatLngExpression,
        zoom: 2,
        minZoom: 2,
        worldCopyJump: true,
      });

      mapInstanceRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      events.forEach((event) => {
        const marker = L.marker([
          parseFloat(event.coordinates.lat),
          parseFloat(event.coordinates.lng),
        ]);

        const popupContent = `
          <div class="p-2">
            <h3 class="font-bold mb-2">${event.location}</h3>
            <p class="text-sm">
              ${dayjs(event.startDate).local().format('MMM D, YYYY')}
              ${event.endDate ? ` - ${dayjs(event.endDate).local().format('MMM D, YYYY')}` : ''}
            </p>
            <p class="text-sm">
              ${dayjs(event.time.startTime).local().format('hh:mm A')} - 
              ${dayjs(event.time.endTime).local().format('hh:mm A')}
            </p>
            <p class="text-sm mt-2">
              <a href="tel:${event.phoneNumber}" class="text-blue-500 hover:text-blue-700">
                ${event.phoneNumber}
              </a>
            </p>
          </div>
        `;

        marker.bindPopup(popupContent).addTo(map);
      });

      if (events.length > 0) {
        const bounds = L.latLngBounds(
          events.map((event) => [
            parseFloat(event.coordinates.lat),
            parseFloat(event.coordinates.lng),
          ]),
        );
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [events]);

  return (
    <div className='w-full h-[40vh] sm:h-[45vh] md:h-[50vh] lg:h-[55vh] xl:h-[60vh] overflow-hidden bg-white/10 backdrop-blur-sm rounded-lg shadow-xl border border-white/20'>
      <div ref={mapRef} className='h-full w-full' />
    </div>
  );
}
