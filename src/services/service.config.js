
import axios from "axios";

const service = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

// Incluir el token automáticamente en cada petición
service.interceptors.request.use((config) => {
  const authToken = localStorage.getItem("authToken");

  if (authToken) {
    config.headers.authorization = `Bearer ${authToken}`;
  }

  return config;
});

export default service;

