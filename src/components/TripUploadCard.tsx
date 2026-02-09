import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UploadTripModal } from "@/components/TripUploadModal";
import { uploadTripApi } from "@/api/tripApi";
import { toast } from "sonner";
import uploadAnimation from "@/assets/videos/uploadanimation.mp4";

export function UploadTripCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = () => {
    setIsModalOpen(true);
  };

  const handleSaveTrip = async (tripName: string, file: File | null) => {
    if (!file) {
      toast.error("File not found. Please upload a CSV file.");
      return;
    }

    try {
      setIsUploading(true);

      await uploadTripApi(tripName, file);

      toast.success("Trip uploaded successfully");
      setIsModalOpen(false);
    } catch (error) {
      console.log("errors", error);
      toast.error("Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
        <div className="flex flex-col items-center justify-center gap-6 py-8">
          {/* Illustration */}
          <video
            src={uploadAnimation}
            autoPlay
            loop
            muted
            playsInline
            className="object-contain h-52"
          >
            Your browser does not support the video tag.
          </video>

          {/* Button */}
          <Button
            onClick={handleUpload}
            className="bg-[#1a2a3a] hover:bg-[#0f1a26] text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 cursor-pointer"
          >
            Upload Trip
          </Button>

          {/* Description */}
          <p className="text-gray-500 text-sm font-medium">
            Upload the CSV file of your trip
          </p>
        </div>
      </div>

      <UploadTripModal
        isOpen={isModalOpen}
        isUploading={isUploading}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTrip}
      />
    </>
  );
}
