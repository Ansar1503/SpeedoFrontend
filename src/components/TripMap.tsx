import {
  MapContainer,
  TileLayer,
  Polyline,
  CircleMarker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

interface GPSPoint {
  id: string;
  latitude: number;
  longitude: number;
  timestamp: Date;
  speed: number;
  ignition: "on" | "off";
  status: "stopped" | "idle" | "overspeed" | "normal";
}

const STATUS_COLORS: Record<GPSPoint["status"], string> = {
  stopped: "#3b82f6",
  idle: "#ef4444",
  overspeed: "#eab308",
  normal: "#10b981",
};

function FitBounds({ points }: { points: GPSPoint[] }) {
  const map = useMap();

  useEffect(() => {
    if (!points.length) return;

    const bounds = points.map((p) => [p.latitude, p.longitude]) as [
      number,
      number,
    ][];

    map.fitBounds(bounds, { padding: [50, 50] });
  }, [points, map]);

  return null;
}

export function TripMap({ gpsPoints }: { gpsPoints: GPSPoint[] }) {
  if (!gpsPoints.length) {
    return (
      <div className="bg-white rounded-2xl border p-4">
        No GPS data available
      </div>
    );
  }

  const center: [number, number] = [
    gpsPoints[0].latitude,
    gpsPoints[0].longitude,
  ];

  const segments = [];
  for (let i = 0; i < gpsPoints.length - 1; i++) {
    const a = gpsPoints[i];
    const b = gpsPoints[i + 1];

    const segmentSpeed = Math.max(a.speed, b.speed);
    let color = "#10b981";
    if (segmentSpeed > 60) color = "#22d3ee";
    else if (segmentSpeed === 0 && a.ignition === "on") color = "#ef4444";
    else if (segmentSpeed === 0 && a.ignition === "off") color = "#3b82f6";

    segments.push({
      positions: [
        [a.latitude, a.longitude],
        [b.latitude, b.longitude],
      ] as [number, number][],
      color,
    });
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
      <div className="flex gap-6 mb-4 flex-wrap">
        <Legend color="bg-blue-500" label="Stopped" />
        <Legend color="bg-red-500" label="Idle" />
        <Legend color="bg-yellow-400" label="Over Speeding" />
        <Legend color="bg-green-500" label="Normal" />
      </div>
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom
        className="w-full h-[460px] rounded-xl"
      >
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {segments.map((seg, idx) => (
          <Polyline
            key={idx}
            positions={seg.positions}
            color={seg.color}
            weight={4}
          />
        ))}

        {gpsPoints.map((point, index) => {
          const isStart = index === 0;
          const isEnd = index === gpsPoints.length - 1;
          if (!isStart && !isEnd && point.status === "normal") {
            return null;
          }

          return (
            <CircleMarker
              key={point.id}
              center={[point.latitude, point.longitude]}
              radius={isStart || isEnd ? 8 : 6}
              pathOptions={{
                fillColor: STATUS_COLORS[point.status],
                color: "#fff",
                weight: 2,
                fillOpacity: 1,
              }}
            >
              <Popup>
                <div className="text-sm font-medium">
                  {isStart ? "Start" : isEnd ? "End" : "Stopped"}
                </div>
                <div className="text-xs">Speed: {point.speed} km/h</div>
              </Popup>
            </CircleMarker>
          );
        })}

        <FitBounds points={gpsPoints} />
      </MapContainer>{" "}
      {/* <div className="flex gap-2 mt-4 justify-center overflow-x-auto">
        {[
          "<",
          "Colaba",
          "Marina Drive",
          "Seashore Drive",
          "Marine Dr",
          ">",
        ].map((label) => (
          <button
            key={label}
            className="px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            {label}
          </button>
        ))}
      </div> */}
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full ${color}`} />
      <span className="text-sm text-gray-600">{label}</span>
    </div>
  );
}
