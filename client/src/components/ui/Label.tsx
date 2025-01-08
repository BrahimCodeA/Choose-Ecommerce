import React from "react";

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  title: string | React.ReactNode;
  icon?: React.ReactNode;
  loading?: boolean;
};

export const Label = ({
  title,
  icon,
  loading = false,
  className = "",
  ...props
}: LabelProps) => {
  return (
    <label className={className} {...props}>
      {icon && <span className="icon">{icon}</span>}
      {title}
      {loading && <span className="loading">...</span>}
    </label>
  );
};
