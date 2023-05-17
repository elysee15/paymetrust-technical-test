import { AxiosError } from "axios";

export default function getErrorMessage(error: unknown) {
  if (error instanceof AxiosError) {
    return error.response?.data;
  }

  if (error instanceof Error) {
    return error.message;
  }
  return error;
}
