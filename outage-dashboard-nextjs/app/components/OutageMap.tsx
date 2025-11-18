'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import { motion } from 'framer-motion';
import type { OutageDataResponse, HeatmapPoint } from '@/types';
import { getHeatmapColor } from '@/lib/utils';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default icon issue
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface OutageMapProps {
  data: OutageDataResponse | undefined;
  isLoading: boolean;
}

function MapUpdater({ data }: { data: OutageDataResponse | undefined }) {
  const map = useMap();

  useEffect(() => {
    if (data && data.data.length > 0) {
      const bounds = L.latLngBounds(
        data.data.map((point) => [point.coordinates.lat, point.coordinates.lon])
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [data, map]);

  return null;
}

export function OutageMap({ data, isLoading }: OutageMapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-[600px] bg-white/90 dark:bg-gray-800/90 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="animate-pulse h-full bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full h-[600px] bg-white/90 dark:bg-gray-800/90 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="animate-pulse h-full bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    );
  }

  // Calculate max calls for normalization
  const maxCalls = Math.max(...(data?.data.map((d) => d.call_count) || [1]));

  // Connecticut center coordinates
  const centerLat = 41.6;
  const centerLon = -72.7;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 }}
      className="w-full h-[600px] bg-white/90 dark:bg-gray-800/90 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 backdrop-blur-sm"
    >
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Outage Heat Map
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {data?.data.length || 0} ZIP codes with technical support calls
        </p>
      </div>
      <div className="h-[calc(100%-76px)]">
        <MapContainer
          center={[centerLat, centerLon]}
          zoom={9}
          className="h-full w-full"
          zoomControl={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {data?.data.map((point) => {
            const intensity = point.call_count / maxCalls;
            const color = getHeatmapColor(intensity);
            const radius = 10 + (intensity * 30); // Scale radius from 10 to 40

            return (
              <CircleMarker
                key={point.zip_code}
                center={[point.coordinates.lat, point.coordinates.lon]}
                radius={radius}
                pathOptions={{
                  fillColor: color,
                  fillOpacity: 0.6,
                  color: color,
                  weight: 2,
                  opacity: 0.8,
                }}
              >
                <Popup>
                  <div className="p-2">
                    <h4 className="font-bold text-lg mb-2">
                      {point.coordinates.city} ({point.zip_code})
                    </h4>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="font-semibold">Calls:</span> {point.call_count}
                      </p>
                      <p>
                        <span className="font-semibold">Avg Duration:</span>{' '}
                        {point.avg_duration.toFixed(1)} min
                      </p>
                      <p>
                        <span className="font-semibold">Customers:</span>{' '}
                        {point.customer_ids.length}
                      </p>
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}

          <MapUpdater data={data} />
        </MapContainer>
      </div>

      {/* Legend */}
      <div className="absolute bottom-8 right-8 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-lg p-3 border border-gray-200 dark:border-gray-700">
        <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Call Volume
        </p>
        <div className="flex items-center gap-2">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#00ff00' }}></div>
              <span className="text-xs text-gray-600 dark:text-gray-400">Low</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#ffff00' }}></div>
              <span className="text-xs text-gray-600 dark:text-gray-400">Medium</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#ff0000' }}></div>
              <span className="text-xs text-gray-600 dark:text-gray-400">High</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
