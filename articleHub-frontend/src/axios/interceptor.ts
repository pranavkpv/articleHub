import type {
  AxiosInstance,
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import { toast } from "react-toastify";
import authAxios from "./authAxios";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

export const setupInterceptors = (
  instance: AxiosInstance,
  loginRedirect?: string
) => {
  instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<{ message: string }>) => {
      const originalRequest = error.config as CustomAxiosRequestConfig | undefined;
      if (!originalRequest) return Promise.reject(error);

      // ✅ Skip refresh logic if it's the refreshToken request itself
      if (originalRequest.url?.includes("/auth/refreshToken")) {
        return Promise.reject(error);
      }

      if (error.response?.data?.message === "This User Could not perform this action in this part") {
        return;
      } else {
        if (error.response?.data?.message !== "No AccessToken Found") {
          toast.error(error.response?.data?.message);
        }
      }

      // ✅ Handle 401 errors (except for refreshToken call)
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const refreshResponse = await authAxios.post("/auth/refreshToken");
          const newAccessToken = refreshResponse.data.data;

          localStorage.setItem("token", newAccessToken);
          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${newAccessToken}`,
          };

          return instance(originalRequest);
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);
          if (loginRedirect) {
            window.location.href = loginRedirect;
          }
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
};
