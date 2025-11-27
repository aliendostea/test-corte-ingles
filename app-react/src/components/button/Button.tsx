import React from "react";
import styles from "./Button.module.css";

type ButtonProps = {
  variant?: "primary" | "secondary";
  title?: string;
  icon?: boolean;
  className?: string;
  form?: string;
  type?: "button" | "submit" | "reset";
  id?: string;
  onClick?: React.MouseEventHandler;
  children: React.ReactNode;
};

export default function Button({ variant = "primary", className = "", children, icon = false, ...rest }: ButtonProps) {
  const variantClasses = [
    variant === "primary" ? styles["btn-primary"] : "",
    variant === "secondary" ? styles["btn-secondary"] : "",
    icon ? styles["btn-icon"] : "",
  ];

  const variantClass = variantClasses.filter(Boolean).join(" ");
  const baseClasses = [styles.btn, variantClass].filter(Boolean).join(" ");
  const classes = className.trim().length > 0 ? `${className}`.trim() : baseClasses;

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
