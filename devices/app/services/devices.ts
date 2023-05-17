import { API_ENDPOINTS } from "~/constants/api-endpoints";
import apiClient from "~/lib/axios";

export function getDevices() {
  return apiClient.get(API_ENDPOINTS.DEVICES).then((res) => res.data);
}
