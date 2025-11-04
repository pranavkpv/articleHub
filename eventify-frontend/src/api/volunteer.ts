import type { AxiosError } from "axios";
import authAxios from "../axios/authAxios";
import type { commonResponse, fetchUserEvent, fetchVounteerReponse, getlistVounteer } from "../interfaces/response";
import type { addVolunteerData, fetchVolunteerData, listVolunter } from "../interfaces/user";

export const takeAttendance = async (result: string): Promise<commonResponse> => {
   try {
      console.log(result)
      const res = await authAxios.post('/volunteer/attendance', { result })
      return res.data
   } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return {
         success: false,
         message: axiosError.response?.data?.message || "Something went wrong",
      };
   }
}

export const getVolunteerEvent = async (): Promise<fetchUserEvent> => {
   try {
      const res = await authAxios.get('/volunteer/event')
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

export const takeFoodToken = async (result: string): Promise<commonResponse> => {
   try {
      const res = await authAxios.post('/volunteer/food', { result })
      return res.data
   } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return {
         success: false,
         message: axiosError.response?.data?.message || "Something went wrong",
      };
   }
}

export const addVolunteer = async (data: addVolunteerData): Promise<commonResponse> => {
   try {
      const res = await authAxios.post('/admin/add-volunteer', data)
      return res.data
   } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return {
         success: false,
         message: axiosError.response?.data?.message || "Something went wrong",
      };
   }
}

export const fetchVolunteer = async (data: fetchVolunteerData): Promise<fetchVounteerReponse> => {
   try {
      const res = await authAxios.get(`/admin/volunteer?search=${ String(data.search) }&page=${ Number(data.page) }`)
      return res.data
   } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return {
         success: false,
         message: axiosError.response?.data?.message || "Something went wrong",
         data: [],
         total: 0
      };
   }
}


export const getAllVolunteers = async (): Promise<getlistVounteer> => {
   try {
      const res = await authAxios.get('/admin/volunteer-list')
      return res.data
   } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return {
         success: false,
         message: axiosError.response?.data?.message || "Something went wrong",
         data: [],
      };
   }
}

export const assignVolunteerToEvent = async (data: string[], event: string): Promise<commonResponse> => {
   try {
      const res = await authAxios.post('/admin/volunteer-add-event', { data, event })
      return res.data
   } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return {
         success: false,
         message: axiosError.response?.data?.message || "Something went wrong",
      };
   }
}

export const editVolunteer = async (data: listVolunter): Promise<commonResponse> => {
   try {
      const { _id, email, phone, username } = data
      const res = await authAxios.put(`/admin/volunteer/${ _id }`, { email, phone, username })
      return res.data
   } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return {
         success: false,
         message: axiosError.response?.data?.message || "Something went wrong",
      };
   }
}