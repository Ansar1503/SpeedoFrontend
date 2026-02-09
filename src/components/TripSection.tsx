import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UploadTripModal } from "@/components/TripUploadModal";
import { TripsList } from "@/components/TripList";
import { uploadTripApi } from "@/api/tripApi";
import { toast } from "sonner";

export function TripsSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSaveTrip = async (_tripName: string, file: File | null) => {
    if (!file) {
      toast.error("Please upload a CSV file");
      return;
    }

    try {
      setIsUploading(true);
      await uploadTripApi(_tripName, file);
      toast.success("Trip uploaded successfully");
      setIsModalOpen(false);
      setRefreshKey((k) => k + 1);
    } catch {
      toast.error("Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Trips</h2>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#1a2a3a] text-white"
        >
          Upload Trip
        </Button>
      </div>

      <TripsList refreshKey={refreshKey} onRefresh={() => setRefreshKey((k) => k + 1)} />

      <UploadTripModal
        isOpen={isModalOpen}
        isUploading={isUploading}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTrip}
      />
    </>
  );
}
