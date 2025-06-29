import type { AxiosError, AxiosHeaders } from "axios";
import axios, { InternalAxiosRequestConfig } from "axios";

// 기본 인스턴스 생성
export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // 서버가 쿠키로 인증할 때
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
  async (err: AxiosError) => {
    if (err.response?.status === 401) {
      const { data } = await axios.post(
        "/auth/refresh",
        {},
        { withCredentials: true }
      );

      const newToken = data.accessToken;

      const original = err.config as InternalAxiosRequestConfig;

      const headers = original.headers as AxiosHeaders | undefined;
      if (headers?.set) {
        headers.set("Authorization", `Bearer ${newToken}`);
      }

      localStorage.setItem("accessToken", newToken);
      return instance(original);
    }
    return Promise.reject(err);
  }
);
