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

export const signinApi = async (payload: {
  email: string;
  password: string;
}) => {
  try {
    const response = await api.post(
      `${authRoutes.auth}${authRoutes.signin}`,
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

export const refreshTokenApi = async () => {
  const response = await api.post(`${authRoutes.auth}${authRoutes.refresh}`);
  return response.data;
};

export const logoutApi = async () => {
  const response = await api.post(`${authRoutes.auth}${authRoutes.logout}`);
  return response.data;
};
