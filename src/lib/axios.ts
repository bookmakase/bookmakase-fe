import { api } from "@/constants/apiPath";
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

export interface RetryableConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

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

// 응답 인터셉터
instance.interceptors.response.use(
  (res: AxiosResponse) => res,
  async (error: AxiosError) => {
    const { response, config } = error;
    const original = config as RetryableConfig;

    //403 Forbidden
    if (response?.status === 403) {
      console.log("#################################1321312323");

      localStorage.clear();
      // window.location.replace("/login");
      return Promise.reject(error);
    }

    // 401 Unauthorized
    // 엑세스 토큰 만료
    // 아직 재시도 안했으면 -> 리프레쉬 요청
    if (response?.status === 401 && !original._retry) {
      original._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");
      console.log("11111111111111111111111", refreshToken);

      if (!refreshToken) {
        localStorage.clear();
        // window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        const { data } = await instance.post(`${api.auth.refreshtoken}`, {
          refreshToken,
        });

        localStorage.setItem("accessToken", data.accessToken);
        if (data.refreshToken) {
          console.log("22222222222222222222222222");
          localStorage.setItem("refreshToken", data.refreshToken);
        }
        return instance(original);
      } catch (refreshErr) {
        console.log("3333333333333333333333331");
        // 리프레쉬 토큰 만료 시
        localStorage.clear();
        // window.location.href = "/login";
        return Promise.reject(refreshErr);
      }
    }
    return Promise.reject(error);
  }
);

// instance.interceptors.response.use(
//   (res) => res,
//   async (error) => {
//     const original = error.config;
//     if (error.response?.status !== 401 || original._retry) {
//       return Promise.reject(error);
//     }
//     original._retry = true;

//     const refreshToken = localStorage.getItem("refreshToken");
//     if (!refreshToken) return Promise.reject(error);

//     const accessToken = localStorage.getItem("accessToken");
//     if (!accessToken) return Promise.reject(error);

//     if (!accessToken && error.response?.status === 403) {
//       return window.location.replace("/");
//     }

//     try {
//       const { data } = await instance.post(api.auth.refreshtoken, {
//         refreshToken,
//       });
//       localStorage.setItem("accessToken", data.accessToken);
//       if (data.refreshToken)
//         localStorage.setItem("refreshToken", data.refreshToken);

//       instance.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
//       original.headers.set("Authorization", `Bearer ${data.accessToken}`);

//       return instance(original); // 재시도
//     } catch (e) {
//       localStorage.clear();
//       window.location.href = "/login";
//       return Promise.reject(e);
//     }
//   }
// );
