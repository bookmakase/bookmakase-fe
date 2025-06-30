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
  validationStatus,
  ...rest
}: InputFeildProps) {
  const borderClass =
    validationStatus === "error"
      ? "border-red-500 focus:border-red-500"
      : validationStatus === "success"
      ? "border-green-500 focus:border-green-500"
      : "border-gray-300 focus:border-green-500";

  return (
    <div className="flex flex-col gap-1 w-[380px]">
      <label htmlFor={id} className="text-gray-500 font-bold">
        {labelText}
      </label>

      <input
        id={id}
        className={`border px-4 py-2 rounded-md 
                    focus:ring-0 focus:outline-none
                    ${borderClass} ${className}`}
        {...rest}
      />
    </div>
  );
}
