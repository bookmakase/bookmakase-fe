import { api } from "@/constants/apiPath";
import { instance } from "@/lib/axios";
import type { LoginData, RegisterData } from "@/types/auth";

export const register = async (data: RegisterData) => {
  try {
    const response = await instance.post(`${api.auth.register}`, data);
    return response.data;
  } catch (error) {
    console.error("회원가입 실패 : ", error);
    throw error;
  }
};

export const login = async (data: LoginData) => {
  try {
    const response = await instance.post(`${api.auth.login}`, data);
    return response.data;
  } catch (error) {
    console.error("로그인 실패 : ", error);
    throw error;
  }
};
