import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface UploadTripModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (tripName: string, file: File | null) => void;
}

export function UploadTripModal({
  isOpen,
  onClose,
  onSave,
}: UploadTripModalProps) {
  const [tripName, setTripName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const droppedFile = droppedFiles[0];

      if (
        droppedFile.type === "text/csv" ||
        droppedFile.name.toLowerCase().endsWith(".csv")
      ) {
        setFile(droppedFile);
      }else{
        toast.info("please add a csv file")
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      setFile(selectedFiles[0]);
    }
  };

  const handleSave = () => {
    if (!file) return;
    if (!file.name.toLowerCase().endsWith(".csv")) return;

    onSave(tripName, file);
    setTripName("");
    setFile(null);
  };

  const handleClose = () => {
    setTripName("");
    setFile(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Upload Trip</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close modal"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Trip Name Input */}
          <div>
            <Input
              type="file"
              onChange={handleFileChange}
              accept=".csv,text/csv"
              className="absolute inset-0 opacity-0 cursor-pointer"
              aria-label="Upload CSV file"
            />
          </div>

          {/* File Upload Area */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center gap-3 transition-colors cursor-pointer ${
              isDragOver
                ? "border-[#5bcec4] bg-blue-50"
                : "border-[#5bcec4] hover:bg-blue-50"
            }`}
          >
            <input
              type="file"
              onChange={handleFileChange}
              accept=".csv,text/csv"
              className="absolute inset-0 opacity-0 cursor-pointer"
              aria-label="Upload Excel file"
            />

            {/* Icon */}
            <svg
              className="w-8 h-8 text-[#5bcec4]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>

            {/* Text */}
            <div className="text-center">
              {file ? (
                <p className="text-[#5bcec4] font-medium">{file.name}</p>
              ) : (
                <p className="text-[#5bcec4] font-medium">
                  Click here to upload the CSV File of your trip
                </p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              onClick={handleClose}
              variant="outline"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors bg-transparent"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 bg-[#1a2a3a] hover:bg-[#0f1a26] text-white font-medium rounded-lg transition-colors"
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
