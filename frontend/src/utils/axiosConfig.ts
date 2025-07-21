import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const userString = localStorage.getItem("userData");
  const user = userString ? JSON.parse(userString) : null;

  if (user?.token) {
    config.headers.set("Authorization", `Bearer ${user.token}`);
  }

  return config;
});

export default instance;
