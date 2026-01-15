import { ApiErrorResponse } from "@/@types/interface/apiErrorResponse.interface";
import { BACKEND_END_POINT, headers } from "@/config/config";
import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosError,
} from "axios";

const API: AxiosInstance = axios.create({
  baseURL: BACKEND_END_POINT,
  headers: {
    ...headers,
    Authorization: `Bearer ${localStorage.getItem("access_token") || ""}`,
  },
  withCredentials: true, // Enables cookies
});

// 🔹 Request interceptor (Add headers like Authorization if needed)
API.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// 🔹 Response interceptor (Handles global API errors)
API.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    const message = error.response?.data?.message || "Something went wrong!";
    console.error("API Error:", message);
    return Promise.reject(error);
  }
);

export default API;
