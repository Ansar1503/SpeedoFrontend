import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import PaginationComponent from "./PaginationComponent";
import { useGetTrips } from "@/hooks/useGetTrips";
import { deleteTripsApi } from "@/api/tripApi";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

export function TripsList({
  refreshKey,
  onRefresh,
}: {
  refreshKey: number;
  onRefresh: () => void;
}) {
  const { trips, loading, page, setPage, pagination } = useGetTrips(
    1,
    5,
    refreshKey,
  );

  const [selectedTrips, setSelectedTrips] = useState<Set<string>>(new Set());
  const [deleting, setDeleting] = useState(false);

  const toggleTrip = (tripId: string) => {
    setSelectedTrips((prev) => {
      const next = new Set(prev);
      next.has(tripId) ? next.delete(tripId) : next.add(tripId);
      return next;
    });
  };

  const handleDeleteConfirmed = async () => {
    const tripIds = Array.from(selectedTrips);
    if (tripIds.length === 0) return;

    try {
      setDeleting(true);
      await deleteTripsApi(tripIds);
      toast.success("Trips deleted successfully");
      setSelectedTrips(new Set());
      onRefresh();
    } catch (error: any) {
      toast.error(error?.message || "Failed to delete trips");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return <p className="p-6">Loading trips...</p>;
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Your Trips</h2>

        <div className="flex gap-3">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                disabled={selectedTrips.size === 0 || deleting}
                className="cursor-pointer"
              >
                Delete
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete selected trips?</AlertDialogTitle>
                <AlertDialogDescription>
                  You are about to delete <strong>{selectedTrips.size}</strong>{" "}
                  trip(s).
                  <br />
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel disabled={deleting}>
                  Cancel
                </AlertDialogCancel>

                <AlertDialogAction
                  onClick={handleDeleteConfirmed}
                  disabled={deleting}
                  className="bg-red-600 hover:bg-red-700 cursor-pointer"
                >
                  {deleting ? "Deleting…" : "Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* OPEN */}
          <Button
            onClick={() =>
              console.log("Open trip:", Array.from(selectedTrips)[0])
            }
            disabled={selectedTrips.size !== 1}
            className="cursor-pointer"
          >
            Open
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-50 border-b px-6 py-4">
          <span className="text-sm font-medium text-gray-700">Trips</span>
        </div>

        <div className="divide-y">
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
