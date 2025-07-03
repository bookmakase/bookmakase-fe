import { logout } from "@/api/auth";
import { instance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export function useLogout() {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      delete instance.defaults.headers.common.Authorization;
    },
  });
}
