import type { AxiosError } from "axios";
import authAxios from "../axios/authAxios";
import type { loginData, signupData, verifyOtpData } from "../interfaces/user";
import type { commonResponse, loginResponse } from "../interfaces/output";

export const signupUser = async (data: signupData): Promise<commonResponse> => {
  try {
    const res = await authAxios.post("/auth/signup", data);
    return res.data
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ message: string }>;
    return { success: false, message: axiosError.response?.data?.message || "Something went wrong" };
  }
};

export const VerifyUserOTP = async (data: verifyOtpData): Promise<commonResponse> => {
  try {
    const res = await authAxios.post("/auth/verify-otp", data);
    return res.data
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ message: string }>;
    return { success: false, message: axiosError.response?.data?.message || "Something went wrong" };
  }
};

export const ResendUserOTP = async (email: string): Promise<commonResponse> => {
  try {
    const res = await authAxios.post("/auth/resend-otp", { email });
    return res.data
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ message: string }>;
    return { success: false, message: axiosError.response?.data?.message || "Something went wrong" };
  }
};

export const userLogin = async (data: loginData): Promise<loginResponse> => {
  try {
    const res = await authAxios.post("/auth/login", data,{withCredentials: true});
    return res.data
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ message: string }>;
    return { success: false, message: axiosError.response?.data?.message || "Something went wrong", data: { token: '', role: '' } };
  }
};

export const LogoutApi = async (): Promise<commonResponse> => {
  try {
    const res = await authAxios.post("/auth/logout");
    return res.data
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ message: string }>;
    return { success: false, message: axiosError.response?.data?.message || "Something went wrong" };
  }
};
