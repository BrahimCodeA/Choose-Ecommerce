import React from "react";

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className = "form-checkbox", ...rest }, ref) => (
    <input type="checkbox" className={className} ref={ref} {...rest} />
  )
);

Checkbox.displayName = "Checkbox";
