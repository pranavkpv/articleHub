import type { AxiosError } from "axios";
import authAxios from "../axios/authAxios";
import type { loginData, ProfileData, signupData, verifyOtpData } from "../interfaces/user";
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
    const res = await authAxios.post("/auth/login", data, { withCredentials: true });
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


export const getUserApi = async () => {
  try {
    const res = await authAxios.get("/user/profile");
    return res.data
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ message: string }>;
    return { success: false, message: axiosError.response?.data?.message || "Something went wrong", data: null };
  }
};



export const updateProfile = async (updatedUser: ProfileData): Promise<commonResponse> => {
  try {
    const formData = new FormData();
    formData.append("_id", updatedUser._id);
    formData.append("firstname", updatedUser.firstname);
    formData.append("lastname", updatedUser.lastname);
    formData.append("email", updatedUser.email);
    formData.append("phone", updatedUser.phone);
    formData.append("DOB", String(updatedUser.DOB));
    formData.append("preferences", JSON.stringify(updatedUser.preferences));
    if (updatedUser.image instanceof File) {
      formData.append("image", updatedUser.image);
    }
    const res = await authAxios.put("/user/edit-profile", formData, {
      headers: { "Content-Type": "multipart/form-data" },
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


export const updatePasswordApi = async (currentPass: string, newPass: string): Promise<commonResponse> => {
  try {
   
    const res = await authAxios.patch("/user/edit-password", {currentpassword:currentPass,newpassword:newPass});
    return res.data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ message: string }>;
    return {
      success: false,
      message: axiosError.response?.data?.message || "Something went wrong",
    };
  }
};


