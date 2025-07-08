import { create } from "zustand";
import { persist } from "zustand/middleware";
import toast from "react-hot-toast";

export interface AuthState {
  isLogin: boolean;
  role: string | null;
  setAuth: (params: { isLogin: boolean; role: string | null }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLogin: false,
      role: null,
      setAuth: ({ isLogin, role }) => set({ isLogin, role }),
      logout: () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        toast.success("로그아웃 완료");
        set({ isLogin: false, role: null });
      },
    }),
    {
      name: "auth-store",
      //로컬 스토리지 키
      partialize: (state) => ({ isLogin: state.isLogin, role: state.role }), // 저장 필드 한정
      onRehydrateStorage: () => (state) => {
        // 3) hydration 완료 후 토큰이 없으면 false로
        if (!localStorage.getItem("accessToken")) {
          state?.setAuth({ isLogin: false, role: null });
        }
      },
    }
  )
);
