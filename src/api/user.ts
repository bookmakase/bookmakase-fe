import { api } from "@/constants/apiPath";
import { instance } from "@/lib/axios";

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
