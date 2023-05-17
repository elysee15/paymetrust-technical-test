import { API_ENDPOINTS } from "~/constants/api-endpoints";
import apiClient from "~/lib/axios";
import { type LoginDto } from "~/types/login.dto";

export default function login(loginDto: LoginDto) {
  return apiClient.post(API_ENDPOINTS.LOGIN, loginDto);
}
