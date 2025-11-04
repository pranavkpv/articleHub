import axios from "axios";
import { setupInterceptors } from "./interceptor"

const authAxios = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

setupInterceptors(authAxios); 

export default authAxios;
