import { login } from "@/api/auth";
import { LoginData } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";

export function useLogin() {
  return useMutation({
    mutationFn: (data: LoginData) => login(data),
  });
}
