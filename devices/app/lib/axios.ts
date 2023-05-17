import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://35.201.2.209:8000",
  withCredentials: true,
});

apiClient.interceptors.request.use(async (config) => {
  return config;
});

export default apiClient;
