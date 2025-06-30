import React from "react";

export interface InputFeildProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText: string;
  id: string;
  validationStatus?: "error" | "success";
}

export default function InputFeild({
  labelText,
  id,
  className = "",
  ...rest
}: InputFeildProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-gray-500 font-bold">
        {labelText}
      </label>

      <input
        id={id}
        className={`border px-4 py-2 rounded-md 
                  focus:border-green-500   /* ⬅︎ 포커스 시 보더 색상 */
                    focus:ring-0             /* 기본 파란 ring 제거(선택) */
                    focus:outline-none       /* 기본 outline 제거(선택) */
          ${className}`}
        {...rest}
      />
    </div>
  );
}
