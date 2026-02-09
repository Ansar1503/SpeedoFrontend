import { authRoutes } from "@/constants/routeConstants";
import api from "./axios";
import axios from "axios";

export const signupApi = async (payload: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await api.post(
      `${authRoutes.auth}${authRoutes.signup}`,
      payload,
    );
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data;
    }
    throw error;
  }
};
