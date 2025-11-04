import type { AxiosError } from "axios";
import authAxios from "../axios/authAxios";
import type { addEventData } from "../interfaces/event";
import type { commonResponse, fetchAdminEvent } from "../interfaces/response";

export const saveEvent = async (data: addEventData): Promise<commonResponse> => {
   try {
      const formData = new FormData();
      formData.append("event_name", data.event_name);
      formData.append("start_date", data.start_date);
      formData.append("end_date", data.end_date);
      formData.append("location", data.location);
      formData.append("description", data.description);
      formData.append("hosted_by", data.hosted_by);
      formData.append("meal_count", data.meal_count);
      formData.append("max_tickets", data.max_tickets);

      formData.append("rewards", JSON.stringify(data.rewards));
      formData.append("guests", JSON.stringify(data.guests));

      if (data.image) {
         formData.append("file", data.image);
      }
      const res = await authAxios.post("/admin/add-event", formData, {
         headers: {
            "Content-Type": "multipart/form-data"
         }
      });

      return res.data;
   } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;
      return {
         success: false,
         message: axiosError.response?.data?.message || "Something went wrong",
      };
   }
};

export const getAdminEvent = async (): Promise<fetchAdminEvent> => {
   try {
      const res = await authAxios.get('/admin/event')
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

export const deleteEvent = async (id: string): Promise<fetchAdminEvent> => {
   try {
      const res = await authAxios.patch(`/admin/event/${ id }`)
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


export const deleteVolunteer = async (id: string): Promise<commonResponse> => {
   try {
      const res = await authAxios.patch(`/admin/volunteer/${ id }`)
      return res.data
   } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return {
         success: false,
         message: axiosError.response?.data?.message || "Something went wrong",
      };
   }
}

export const updateEvent = async (id: string, data: addEventData): Promise<commonResponse> => {
   try {
      const res = await authAxios.put(`/admin/event/${ id }`, data, {
         headers: {
            "Content-Type": "multipart/form-data"
         }
      })
      return res.data
   } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return {
         success: false,
         message: axiosError.response?.data?.message || "Something went wrong",
      };
   }
}