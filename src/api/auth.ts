import { api } from "@/constants/apiPath";
import { instance } from "@/lib/axios";

export interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  phone: string;
}

export const register = async (data: RegisterData) => {
  try {
    const response = await instance.post(`${api.auth}/register`, data);
    return response.data;
  } catch (error) {
    console.error("회원가입 실패 : ", error);
    throw error;
  }
};
