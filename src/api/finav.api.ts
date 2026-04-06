import axios from "axios";

export const finavApi = axios.create({
  baseURL: "https://finav-backend.onrender.com/api",
  // baseURL: "http://localhost:4000/api",
});

finavApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("tokenFinav");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
