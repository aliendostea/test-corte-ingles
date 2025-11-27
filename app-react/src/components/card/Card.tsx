import React from "react";

import styles from "./Card.module.css";

type CardProps = React.HTMLAttributes<HTMLElement> & {
  variant?: "overlay";
  children: React.ReactNode;
};

export default function Card({ children, variant }: CardProps) {
  const variantClasses = [variant === "overlay" ? styles["card-overlay"] : ""];
  const baseClasses = [styles.card, variantClasses].filter(Boolean).join(" ");

  return <div className={baseClasses}>{children}</div>;
}
