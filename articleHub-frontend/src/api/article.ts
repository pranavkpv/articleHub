import type { AxiosError } from "axios";
import authAxios from "../axios/authAxios";

export const fetchPreferenceBaseArticleApi = async () => {
  try {
    const res = await authAxios.get("/article/all-article");
    return res.data
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ message: string }>;
    return { success: false, message: axiosError.response?.data?.message || "Something went wrong", data: [] };
  }
};

export const getUserArticle = async () => {
  try {
    const res = await authAxios.get("/article/user-article");
    return res.data
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ message: string }>;
    return { success: false, message: axiosError.response?.data?.message || "Something went wrong", data: [] };
  }
};

export const likeApi = async (id: string) => {
  try {
    const res = await authAxios.post("/article/like", { articleId: id });
    return res.data
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ message: string }>;
    return { success: false, message: axiosError.response?.data?.message || "Something went wrong", data: [] };
  }
};


export const dislikeApi = async (id: string) => {
  try {
    const res = await authAxios.post("/article/dislike", { articleId: id });
    return res.data
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ message: string }>;
    return { success: false, message: axiosError.response?.data?.message || "Something went wrong", data: [] };
  }
};

export const blockApi = async (id: string) => {
  try {
    const res = await authAxios.post("/article/block", { articleId: id });
    return res.data
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ message: string }>;
    return { success: false, message: axiosError.response?.data?.message || "Something went wrong", data: [] };
  }
};

export const deleteArticle = async (id: string) => {
  try {
    const res = await authAxios.patch(`/article/delete/${ id }`);
    return res.data
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ message: string }>;
    return { success: false, message: axiosError.response?.data?.message || "Something went wrong", data: [] };
  }
};

export const addArticle = async (formData: FormData) => {
  try {
    const res = await authAxios.post(`/article/add`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ message: string }>;
    return { success: false, message: axiosError.response?.data?.message || "Something went wrong", data: [] };
  }
};

export const updateArticle = async (formData: FormData) => {
  try {
    const articleId = formData.get('_id');
    if (!articleId) {
      throw new Error("Article ID missing in FormData");
    }
    const res = await authAxios.put(`/article/edit/${ articleId }`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ message: string }>;
    return { success: false, message: axiosError.response?.data?.message || "Something went wrong", data: [] };
  }
};

