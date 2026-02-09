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

export const getTripsApi = async (page = 1, limit = 10) => {
  const response = await api.get(`${tripRoutes.trips}`, {
    params: { page, limit },
  });
  return response.data; 
};


export const deleteTripsApi = async (tripIds: string[]) => {
  const response = await api.delete(`${tripRoutes.trips}`, {
    data: { tripIds },
  });
  return response.data;
};
