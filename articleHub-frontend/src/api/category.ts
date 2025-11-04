import type { AxiosError } from "axios";
import authAxios from "../axios/authAxios";
import type { listCategoryOutput } from "../interfaces/output";

export const listCategoryApi = async (): Promise<listCategoryOutput> => {
  try {
    const res = await authAxios.get("/auth/category");
    return res.data
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ message: string }>;
    return { success: false, message: axiosError.response?.data?.message || "Something went wrong",data:[] };
  }
};