import { updateProfileImage, UserProfileResponse } from "@/api/user";
import { useMutation } from "@tanstack/react-query";

export const useUpdateProfileImage = () => {
  return useMutation<UserProfileResponse, Error, File>({
    mutationFn: updateProfileImage,
  });
};
