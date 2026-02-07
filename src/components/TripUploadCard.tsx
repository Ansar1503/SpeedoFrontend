"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UploadTripModal } from "@/components/TripUploadModal";

export function UploadTripCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUpload = () => {
    setIsModalOpen(true);
  };

  const handleSaveTrip = (tripName: string, file: File | null) => {
    console.log("Trip saved:", { tripName, file: file?.name });
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
        <div className="flex flex-col items-center justify-center gap-6 py-8">
          {/* Illustration */}
          <div className="relative w-full h-64">
            <img
              src="/trip-illustration.jpg"
              alt="Trip planning illustration"
              className="object-contain"
            />
          </div>

          {/* Button */}
          <Button
            onClick={handleUpload}
            className="bg-[#1a2a3a] hover:bg-[#0f1a26] text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
          >
            Upload Trip
          </Button>

          {/* Description */}
          <p className="text-gray-500 text-sm font-medium">
            Upload the Excel sheet of your trip
          </p>
        </div>
      </div>

      <UploadTripModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTrip}
      />
    </>
  );
}
