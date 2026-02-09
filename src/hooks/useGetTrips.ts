import { useEffect, useState } from "react";
import { getTripsApi } from "@/api/tripApi";

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export const useGetTrips = (
  initialPage = 1,
  initialLimit = 5,
  refreshKey: number,
) => {
  const [trips, setTrips] = useState<any[]>([]);
  const [page, setPage] = useState(initialPage);
  const [limit] = useState(initialLimit);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [pagination, setPagination] = useState<Pagination>({
    page: initialPage,
    limit: initialLimit,
    total: 0,
    totalPages: 1,
  });

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getTripsApi(page, limit);

        setTrips(response.data);
        setPagination(response.pagination);
      } catch (err: any) {
        setError(err?.message || "Failed to fetch trips");
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, [page, limit, refreshKey]);

  return {
    trips,
    loading,
    error,
    page,
    limit,
    pagination,
    setPage,
  };
};
