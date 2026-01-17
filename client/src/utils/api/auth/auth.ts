import axios from "axios";
import { BACKEND_END_POINT } from "../../../config/config";

const api = axios.create({
  baseURL: BACKEND_END_POINT,
});

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name?: string;
  };
}

export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/auth/login", credentials);
  return response.data;
};
