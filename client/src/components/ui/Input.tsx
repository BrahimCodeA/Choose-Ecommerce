import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, placeholder, className = "form-input", ...rest }, ref) => (
    <input
      type={type}
      className={className}
      placeholder={placeholder}
      ref={ref}
      {...rest}
    />
  )
);
