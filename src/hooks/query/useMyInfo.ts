import { getMyInfo } from "@/api/user";
import { useQuery } from "@tanstack/react-query";

export function useMyIntro() {
  return useQuery({
    queryKey: ["myIntro"],
    queryFn: getMyInfo,
    staleTime: 5 * 60_000,
  });
}
