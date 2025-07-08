import { userInformationUpdate, patchAddress } from "@/api/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useInformationUpdate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: userInformationUpdate) =>
      userInformationUpdate(request),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myIntro"] });
    },

    onError: (error) => {
      console.error("인포메이션 업데이트 실패 : ", error);
    },
  });
}

export const usePatchAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (address: string) => patchAddress(address),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myIntro"] });
    },
    onError: (error) => {
      console.error("주소 변경 실패 : ", error);
    },
  });
};
