import { logout } from "@/api/auth";
import { useAuthStore } from "@/store/auth";
import { useMutation } from "@tanstack/react-query";

export function useLogout() {
  const logoutState = useAuthStore.getState().logout;
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      logoutState();
    },
  });
}
