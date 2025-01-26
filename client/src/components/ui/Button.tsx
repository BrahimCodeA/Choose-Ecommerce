import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  title?: string | React.ReactNode;
  icon?: React.ReactNode;
  loading?: boolean;
};

export const Button = ({
  children,
  title,
  icon,
  loading = false,
  className = "",
  ...props
}: ButtonProps) => {
  return (
    <button className={className} {...props}>
      {title && <span className="button-title">{title}</span>}
      {icon && <span className="button-icon">{icon}</span>}
      {loading ? "Chargement..." : children}
    </button>
  );
};
