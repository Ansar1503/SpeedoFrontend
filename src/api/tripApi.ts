import { tripRoutes } from "@/constants/routeConstants";
import api from "./axios";

export const uploadTripApi = async (tripName: string, file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("name", tripName);

  const response = await api.post(
    `${tripRoutes.trips}${tripRoutes.upload}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data;
};

// export const getTripsApi = async (page = 1, limit = 10) => {
//   const response = await api.get("/trips", {
//     params: { page, limit },
//   });
//   return response.data;
// };

// export const getTripByIdApi = async (tripId: string) => {
//   const response = await api.get(`/trips/${tripId}`);
//   return response.data;
// };
