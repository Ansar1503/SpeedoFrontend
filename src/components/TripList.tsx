"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import PaginationComponent from "./PaginationComponent";

export function TripsList() {
  const [selectedTrips, setSelectedTrips] = useState<Set<string>>(new Set());
  const handleDelete = () => {
    if (selectedTrips.size > 0) {
      console.log("Deleting trips:", Array.from(selectedTrips));
      setSelectedTrips(new Set());
    }
  };

  const handleOpen = () => {
    if (selectedTrips.size > 0) {
      console.log("Opening trip:", Array.from(selectedTrips)[0]);
    }
  };

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
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed bg-transparent"
          >
            Delete
          </Button>
          <Button
            onClick={handleOpen}
            disabled={selectedTrips.size !== 1}
            className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Open
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        {/* Table Header */}
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex items-center gap-4">
          <Checkbox />
          <span className="text-sm font-medium text-gray-700">Trips</span>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-200"></div>
      </div>

      {/* Pagination */}
      <PaginationComponent
        currentPage={1}
        handlePageChange={() => {}}
        itemsPerPage={10}
        totalItems={19}
        totalPages={19}
      />
    </div>
  );
}
