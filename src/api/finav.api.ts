import axios from "axios";

export const finavApi = axios.create({
  baseURL: "http://localhost:4000/api",
});
