import type { AxiosError } from "axios";
import authAxios from "../axios/authAxios";

export const likeArticle = async (id: string) => {
   try {
      const res = await authAxios.post(`/article/like`, {id:String(id)});
      return res.data
   } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;
      return { success: false, message: axiosError.response?.data?.message || "Something went wrong", data: [] };
   }
};

export const disLikeArticle = async (id: string) => {
   try {
      const res = await authAxios.post(`/article/dislike`, {id:String(id)});
      return res.data
   } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;
      return { success: false, message: axiosError.response?.data?.message || "Something went wrong", data: [] };
   }
};