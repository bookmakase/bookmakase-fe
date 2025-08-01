import { getMyInfo } from "@/api/user";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth";

export function useMyIntro() {
  const { isLogin } = useAuthStore();

  return useQuery({
    queryKey: ["myIntro"],
    queryFn: getMyInfo,
    staleTime: 5,
    enabled: isLogin,
  });
}
