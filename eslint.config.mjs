import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "warn", // 에러 → 경고
      "react-hooks/exhaustive-deps": "warn", // 에러 → 경고
      "@next/next/no-img-element": "off", // 완전 무시
    },
  },
];

export default eslintConfig;
