import React from "react";

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ value, placeholder, className = "form-textarea", ...rest }, ref) => (
    <textarea
      className={className}
      placeholder={placeholder}
      value={value}
      ref={ref}
      {...rest}
    />
  )
);
