import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  title?: string | React.ReactNode;
  icon?: React.ReactNode;
  loading?: boolean;
};

export const Button = ({
  children,
  icon,
  loading = false,
  className = "",
  ...props
}: ButtonProps) => {
  return (
    <button className={className} {...props}>
      {icon && <span className="button-icon">{icon}</span>}
      {loading ? "Chargement..." : children}
    </button>
  );
};
