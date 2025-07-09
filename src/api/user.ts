import { api } from "@/constants/apiPath";
import { instance } from "@/lib/axios";
import { User } from "@/types/user";

export interface userInformationUpdate {
  currentPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
  newUsername?: string;
}

export const getMyInfo = async () => {
  try {
    const response = await instance.get(`${api.users}/me`);
    return response.data;
  } catch (error) {
    console.error("내 정보 조회 실패 : ", error);
    throw error;
  }
};

export const userIntroUpdate = async (intro: string) => {
  try {
    const response = await instance.patch(`${api.users}/intro`, { intro });
    return response.data;
  } catch (error) {
    console.error("인트로 업데이트 실패 : ", error);
    throw error;
  }
};

export const userInformationUpdate = async (data: userInformationUpdate) => {
  try {
    const response = await instance.put(`${api.users}/information`, data);
    return response.data;
  } catch (error) {
    console.error("내정보 업데이트 실패 :", error);
    throw error;
  }
};

export const getUserInfo = async () => {
  try {
    const response = await instance.get<User>(`${api.users}/me`);
    return response.data;
  } catch (e) {
    console.error("내 정보 조회 실패 : ", e);
    throw e;
  }
};

export const patchAddress = async (address: string) => {
  try {
    const response = await instance.patch(`${api.users}/address`, { address });
    return response.data;
  } catch (e) {
    console.error("주소 변경경 실패 : ", e);
    throw e;
  }
};
