import { register } from "@/api/auth";
import type { RegisterData } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";

export function useRegister() {
  return useMutation({
    mutationFn: (data: RegisterData) => register(data),
  });
}
