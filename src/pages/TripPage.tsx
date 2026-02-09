import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TripStats } from "../components/TripStats";
import { TripMap } from "../components/TripMap";
import { TripSegmentsTable } from "../components/TripSegmentTable";
import { type GPSPointRaw } from "../lib/gpsUtils";
import { getTripById } from "@/api/tripApi";
import { DashboardHeader } from "@/components/layouts/Header";

interface FetchTripResponse {
  trip: {
    _id: string;
    name: string;
    startTime?: string | null;
    endTime?: string | null;
    totalDistance?: number;
    totalDuration?: number;
    totalIdlingDuration?: number;
    totalStoppageDuration?: number;
    overspeedDuration?: number;
    overspeedDistance?: number;
  };
  gpsPoints: Array<
    GPSPointRaw & {
      _id?: string;
      status?: "stopped" | "idle" | "overspeed" | "normal";
    }
  >;
}

type MapPoint = {
  id: string;
  latitude: number;
  longitude: number;
  timestamp: Date;
  speed: number;
  ignition: "on" | "off";
  status: "stopped" | "idle" | "overspeed" | "normal";
};

export default function TripPage() {
  const params = useParams();
  const navigate = useNavigate();
  const tripId = params.tripId;
  const [loading, setLoading] = useState(true);
  //   const [error, setError] = useState<string | null>(null);
  const [tripApi, setTripApi] = useState<FetchTripResponse | null>(null);
  const [mapPoints, setMapPoints] = useState<MapPoint[]>([]);
  const [tripTotals, setTripTotals] = useState({
    totalDistance: 0,
    totalDuration: 0,
    totalIdlingDuration: 0,
    totalStoppageDuration: 0,
    overspeedDuration: 0,
    overspeedDistance: 0,
  });

  useEffect(() => {
    let mounted = true;
    async function load() {
      if (!tripId) {
        // setError("Trip ID missing");
        setLoading(false);
        return;
      }

      setLoading(true);
      //   setError(null);

      try {
        const result = await getTripById(tripId);
        const data = result.data;
        console.log("data", data);
        if (!mounted) return;
        setTripApi(data);

        const normalized: MapPoint[] = data.gpsPoints.map(
          (p: any, idx: any) => ({
            id: p._id ? String(p._id) : String(idx),
            latitude: p.latitude,
            longitude: p.longitude,
            timestamp: new Date(p.timestamp),
            speed: Math.round(p.speed ?? 0),
            ignition:
              (p.ignition ?? "off").toString().toLowerCase() === "on"
                ? "on"
                : "off",
            status: p.status ?? "normal",
          }),
        );

        setMapPoints(normalized);

        setTripTotals({
          totalDistance: (data.trip.totalDistance ?? 0) / 1000,
          totalDuration: Math.round((data.trip.totalDuration ?? 0) / 60),
          totalIdlingDuration: Math.round(
            (data.trip.totalIdlingDuration ?? 0) / 60,
          ),
          totalStoppageDuration: Math.round(
            (data.trip.totalStoppageDuration ?? 0) / 60,
          ),
          overspeedDuration: Math.round(
            (data.trip.overspeedDuration ?? 0) / 60,
          ),
          overspeedDistance: (data.trip.overspeedDistance ?? 0) / 1000,
        });
      } catch (err: any) {
        console.error(err);
        // setError(
        //   err?.response?.data?.message ??
        //     err?.message ??
        //     "Failed to load trip. Check server logs or network.",
        // );
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [tripId]);

  if (loading) return <div className="p-6">Loading trip...</div>;
  if (!tripApi) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <h2 className="text-xl font-semibold text-gray-800">
          No trip details found
        </h2>
        <p className="text-sm text-gray-500 text-center max-w-md">
          The trip you are trying to view does not exist or you don’t have
          access to it.
        </p>

        <button
          onClick={() => navigate("/dashboard/")}
          className="px-5 py-2 rounded-lg bg-[#5bcec4] text-white font-medium hover:opacity-90 transition"
        >
          ← Back to Trips
        </button>
      </div>
    );
  }

  const segments = mapPoints.map((p) => ({
    time: p.timestamp.toLocaleString(),
    point: `${p.latitude.toFixed(5)}, ${p.longitude.toFixed(5)}`,
    ignition: p.ignition === "on" ? "ON" : "OFF",
    speed: `${Math.round(p.speed)} km/h`,
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <DashboardHeader />

      {/* Page content */}
      <main className="max-w-[1400px] mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/dashboard/")}
            className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition cursor-pointer"
          >
            ← Back
          </button>

          <h2 className="text-2xl font-semibold">
            {tripApi.trip.name || "Trip"}
          </h2>

          <div className="text-sm text-gray-500">
            {tripApi.trip.startTime
              ? new Date(tripApi.trip.startTime).toLocaleString()
              : ""}
            {tripApi.trip.endTime
              ? ` — ${new Date(tripApi.trip.endTime).toLocaleString()}`
              : ""}
          </div>
        </div>

        <div className="space-y-8">
          {/* Map */}
          <TripMap gpsPoints={mapPoints} />

          {/* Stats */}
          <TripStats
            trip={{
              totalDistance: Math.round(tripTotals.totalDistance),
              totalDuration: Math.round(tripTotals.totalDuration),
              totalStoppageDuration: Math.round(
                tripTotals.totalStoppageDuration,
              ),
              totalIdlingDuration: Math.round(tripTotals.totalIdlingDuration),
              overspeedDuration: Math.round(tripTotals.overspeedDuration),
              overspeedDistance: Math.round(tripTotals.overspeedDistance),
            }}
          />
        </div>

        <TripSegmentsTable data={segments} />
      </main>
    </div>
  );
}
