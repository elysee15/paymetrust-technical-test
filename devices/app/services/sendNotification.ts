import { API_ENDPOINTS } from "~/constants/api-endpoints";
import apiClient from "~/lib/axios";
import type { SendNotificationDto } from "~/types/send-notification.dto";

export default function sendNotification(
  sendNotificationDto: SendNotificationDto,
  token: string
) {
  return apiClient.post(API_ENDPOINTS.NOTIFY, sendNotificationDto, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
