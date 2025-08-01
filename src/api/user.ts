import { api } from "@/constants/apiPath";
import { instance } from "@/lib/axios";
import { User } from "@/types/user";

export interface userInformationUpdate {
  currentPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
  newUsername?: string;
}

export type UserRole = "USER" | "ADMIN";

export interface UserProfileResponse {
  userId: number;
  username: string;
  email: string;
  createdAt: string;
  imageUrl: string | null;
  intro: string | null;
  phone: string | null;
  address: string | null;
  point: number;
  role: UserRole;
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
    console.error("주소 변경 실패 : ", e);
    throw e;
  }
};

export const updateProfileImage = async (
  file: File
): Promise<UserProfileResponse> => {
  const formData = new FormData();
  formData.append("file", file);
  try {
    const response = await instance.patch<UserProfileResponse>(
      `${api.users}/profile-image`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (e) {
    console.error("이미지 업로드 실패 : ", e);
    throw e;
  }
};
