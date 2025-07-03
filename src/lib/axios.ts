import { api } from "@/constants/apiPath";
import axios, { InternalAxiosRequestConfig } from "axios";

// 기본 인스턴스 생성
export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  // withCredentials: true, // 이방식 x
  timeout: 15_000,
});

// 요청 인터셉터 - access-token 헤더 자동 첨부
instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// 응답 인터셉터 - 401 => 토큰 재발급 & 재시도
instance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status !== 401 || original._retry) {
      return Promise.reject(error);
    }
    original._retry = true;

    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) return Promise.reject(error);

    try {
      const { data } = await instance.post(api.auth.refreshtoken, {
        refreshToken,
      });
      localStorage.setItem("accessToken", data.accessToken);
      if (data.refreshToken)
        localStorage.setItem("refreshToken", data.refreshToken);

      instance.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
      original.headers.set("Authorization", `Bearer ${data.accessToken}`);

      return instance(original); // 재시도
    } catch (e) {
      localStorage.clear();
      window.location.href = "/login";
      return Promise.reject(e);
    }
  }
);
