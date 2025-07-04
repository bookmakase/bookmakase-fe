import { userIntroUpdate } from "@/api/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useIntroUpdate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (intro: string) => userIntroUpdate(intro),

    // 성공 후 로직
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myIntro"] });
    },

    onError: (err) => {
      console.error("인트로 업데이트 실패 : ", err);
    },
  });
}
