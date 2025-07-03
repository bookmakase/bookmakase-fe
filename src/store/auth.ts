import { create } from "zustand";
import { persist } from "zustand/middleware";
import toast from "react-hot-toast";

export interface AuthState {
  isLogin: boolean;
  setLogin: (v: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLogin: false,
      setLogin: (v) => set({ isLogin: v }),
      logout: () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        toast.success("로그아웃 완료");
        set({ isLogin: false });
      },
    }),
    {
      name: "auth-store",
      //로컬 스토리지 키
      partialize: (state) => ({ isLogin: state.isLogin }), // 저장 필드 한정
      onRehydrateStorage: () => (state) => {
        // 3) hydration 완료 후 토큰이 없으면 false로
        if (!localStorage.getItem("accessToken")) state?.setLogin(false);
      },
    }
  )
);
