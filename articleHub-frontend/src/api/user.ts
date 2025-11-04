import type { AxiosError } from "axios";
import authAxios from "../axios/authAxios";
import type { commonResponse, fetchUserEvent } from "../interfaces/response";

export const getUserEvents = async (): Promise<fetchUserEvent> => {
   try {
      const res = await authAxios.get('/user/event')
      return res.data
   } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return {
         success: false,
         message: axiosError.response?.data?.message || "Something went wrong",
         data: []
      };
   }
}

export const bookEvent = async (event:string): Promise<commonResponse> => {
   try {
      const res = await authAxios.patch(`/user/book-event/${event}`)
      return res.data
   } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return {
         success: false,
         message: axiosError.response?.data?.message || "Something went wrong",
      };
   }
}

export const usersEvent = async (): Promise<fetchUserEvent> => {
   try {
      const res = await authAxios.get(`/user/usersevent`)
      return res.data
   } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return {
         success: false,
         message: axiosError.response?.data?.message || "Something went wrong",
         data:[]
      };
   }
}