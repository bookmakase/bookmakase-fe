// lib/validation.ts
import { z } from "zod";

const strongPw = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,32}$/;

export const registerSchema = z
  .object({
    email: z.string().email("이메일 형식이 올바르지 않습니다."),
    password: z
      .string()
      .regex(
        strongPw,
        "최소 8자 이상 · 영문, 숫자, 특수문자를 모두 포함해야 합니다."
      ),
    confirm: z.string().regex(strongPw, "비밀번호가 다릅니다."),
    nickname: z.string().min(4, "4자 이상").max(10, "10자 이하").trim(),
  })
  .refine(({ password, confirm }) => password === confirm, {
    message: "입력한 비밀번호가 다릅니다.",
    path: ["confirm"],
  });

export const loginSchema = z.object({
  email: z.string().email("이메일 형식이 올바르지 않습니다."),
  password: z
    .string()
    .regex(
      strongPw,
      "최소 8자 이상 영문, 숫자, 특수문자를 모두 포함해야 합니다."
    ),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
