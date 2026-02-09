// import React from "react";

interface Trip {
  totalDistance: number;
  totalDuration: number;
  totalStoppageDuration: number;
  totalIdlingDuration: number;
  overspeedDuration: number;
  overspeedDistance: number;
}

// const StatIcon = ({
//   children,
//   color,
// }: {
//   children: React.ReactNode;
//   color: string;
// }) => (
//   <div
//     className={`w-10 h-10 rounded-lg flex items-center justify-center text-white text-lg ${color}`}
//   >
//     {children}
//   </div>
// );

export function TripStats({ trip }: { trip: Trip }) {
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}hr ${mins}mins`;
    }
    return `${mins}mins`;
  };

  const stats = [
    {
      label: "Total Distance Travelled",
      value: `${trip.totalDistance} KM`,
      icon: "📍",
      color: "bg-blue-500",
    },
    {
      label: "Total Travel Duration",
      value: formatTime(trip.totalDuration),
      icon: "⏱️",
      color: "bg-cyan-500",
    },
    {
      label: "Over Speeding Duration",
      value: `${trip.overspeedDuration} Mins`,
      icon: "⚡",
      color: "bg-orange-500",
    },
    {
      label: "Over Speeding Distance",
      value: `${trip.overspeedDistance} KM`,
      icon: "🚗",
      color: "bg-red-500",
    },
    {
      label: "Stopped Duration",
      value: `${trip.totalStoppageDuration} Mins`,
      icon: "🛑",
      color: "bg-indigo-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex flex-col items-center gap-3">
            <div className="text-2xl">{stat.icon}</div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-600 mt-1">{stat.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
