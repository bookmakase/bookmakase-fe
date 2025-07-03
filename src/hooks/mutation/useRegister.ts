import { register, RegisterData } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";

export function useRegister() {
  return useMutation({
    mutationFn: (data: RegisterData) => register(data),
  });
}
