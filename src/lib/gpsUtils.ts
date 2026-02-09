export interface GPSPointRaw {
  _id?: string;
  latitude: number;
  longitude: number;
  timestamp: string | number | Date;
  speed: number;
  ignition: "on" | "off" | "ON" | "OFF" | string;
}

export interface GPSPoint extends GPSPointRaw {
  timestampMs: number;
  status: "stopped" | "idle" | "overspeed" | "normal";
}

export function haversineKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function classifyPoint(p: GPSPointRaw, overspeedThresholdKmh = 60) {
  const speed = p.speed ?? 0;
  const ign = (p.ignition ?? "").toString().toLowerCase();
  if (speed <= 2 && ign === "off") return "stopped";
  if (speed <= 2 && ign === "on") return "idle";
  if (speed > overspeedThresholdKmh) return "overspeed";
  return "normal";
}

export function computeTripSummaryFromGps(
  rawPoints: GPSPointRaw[],
  opts?: { overspeedThresholdKmh?: number },
) {
  const overspeedThresholdKmh = opts?.overspeedThresholdKmh ?? 60;

  if (!rawPoints || rawPoints.length === 0) {
    return {
      totalDistance: 0,
      totalDuration: 0,
      totalIdlingDuration: 0,
      totalStoppageDuration: 0,
      overspeedDuration: 0,
      overspeedDistance: 0,
      gpsPointsWithStatus: [],
    };
  }

  const points = [...rawPoints].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
  );
  const gpsPointsWithStatus: GPSPoint[] = points.map((p) => ({
    ...p,
    timestampMs: new Date(p.timestamp).getTime(),
    status: classifyPoint(p, overspeedThresholdKmh) as any,
    ignition: (p.ignition ?? "off").toString().toLowerCase(),
  }));

  let totalDistance = 0;
  let totalDurationMinutes = 0;
  let totalIdlingDuration = 0;
  let totalStoppageDuration = 0;
  let overspeedDuration = 0;
  let overspeedDistance = 0;

  for (let i = 0; i < gpsPointsWithStatus.length - 1; i++) {
    const a = gpsPointsWithStatus[i];
    const b = gpsPointsWithStatus[i + 1];
    const dtMs = b.timestampMs - a.timestampMs;
    const dtMin = Math.max(0, dtMs / 1000 / 60);
    const dKm = haversineKm(a.latitude, a.longitude, b.latitude, b.longitude);

    totalDistance += dKm;
    totalDurationMinutes += dtMin;

    if (a.status === "stopped") totalStoppageDuration += dtMin;
    else if (a.status === "idle") totalIdlingDuration += dtMin;
    else if (a.status === "overspeed") overspeedDuration += dtMin;

    if (a.status === "overspeed") overspeedDistance += dKm;
  }
  const round = (n: number) => Math.round(n * 100) / 100;

  return {
    totalDistance: round(totalDistance),
    totalDuration: Math.round(totalDurationMinutes),
    totalIdlingDuration: Math.round(totalIdlingDuration),
    totalStoppageDuration: Math.round(totalStoppageDuration),
    overspeedDuration: Math.round(overspeedDuration),
    overspeedDistance: round(overspeedDistance),
    gpsPointsWithStatus,
  };
}
