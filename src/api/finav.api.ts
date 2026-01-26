import axios from "axios";

export const finavApi = axios.create({
  baseURL: "https://finav-backend.onrender.com/api",
});
