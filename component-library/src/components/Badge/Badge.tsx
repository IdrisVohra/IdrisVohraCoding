import type { HTMLAttributes } from "react";
import "./Badge.css";

export type BadgeVariant = "default" | "primary" | "success" | "warning" | "danger" | "info";
export type BadgeSize = "sm" | "md";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Semantic color of the badge. @default "default" */
  variant?: BadgeVariant;
  /** Size of the badge. @default "md" */
  size?: BadgeSize;
  /** Shows a small colored dot before the label. */
  dot?: boolean;
}

export function Badge({ variant = "default", size = "md", dot = false, className, children, ...rest }: BadgeProps) {
  const classes = ["uk-badge", `uk-badge--${variant}`, `uk-badge--${size}`, className ?? ""]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes} {...rest}>
      {dot && <span className="uk-badge__dot" aria-hidden="true" />}
      {children}
    </span>
  );
}
