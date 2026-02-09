import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import PaginationComponent from "./PaginationComponent";
import { useGetTrips } from "@/hooks/useGetTrips";

export function TripsList({ refreshKey }: { refreshKey: number }) {
  const { trips, loading, page, setPage, pagination } = useGetTrips(
    1,
    5,
    refreshKey,
  );
  const [selectedTrips, setSelectedTrips] = useState<Set<string>>(new Set());

  const toggleTrip = (tripId: string) => {
    setSelectedTrips((prev) => {
      const next = new Set(prev);
      next.has(tripId) ? next.delete(tripId) : next.add(tripId);
      return next;
    });
  };

  const handleDelete = () => {
    const tripIds = Array.from(selectedTrips);
    setSelectedTrips(new Set());
  };

  const handleOpen = () => {
    console.log("Opening trip:", Array.from(selectedTrips)[0]);
  };

  if (loading) {
    return <p className="p-6">Loading trips...</p>;
  }
  console.log("trips", trips);
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Your Trips</h2>
        <div className="flex gap-3">
          <Button
            onClick={handleDelete}
            disabled={selectedTrips.size === 0}
            variant="outline"
          >
            Delete
          </Button>
          <Button onClick={handleOpen} disabled={selectedTrips.size !== 1}>
            Open
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gray-50 border-b px-6 py-4 flex gap-4">
          <span className="text-sm font-medium text-gray-700">Trips</span>
        </div>

        {/* Body */}
        <div className="divide-y">
          {trips.length === 0 && (
            <p className="p-6 text-gray-500">No trips found</p>
          )}

          {trips.map((trip) => (
            <div key={trip.id} className="px-6 py-4 flex items-center gap-4">
              <Checkbox
                checked={selectedTrips.has(trip.id)}
                onCheckedChange={() => toggleTrip(trip.id)}
              />
              <div>
                <p className="font-medium">{trip.name}</p>
                <p className="text-sm text-gray-500">
                  {new Date(trip.startTime).toLocaleString()} →{" "}
                  {new Date(trip.endTime).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <PaginationComponent
        currentPage={page}
        handlePageChange={setPage}
        itemsPerPage={pagination.limit}
        totalItems={pagination.total}
        totalPages={pagination.totalPages}
      />
    </div>
  );
}
