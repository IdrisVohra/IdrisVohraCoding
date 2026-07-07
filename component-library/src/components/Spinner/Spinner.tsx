import type { HTMLAttributes } from "react";
import "./Spinner.css";

export type SpinnerSize = "sm" | "md" | "lg";

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  /** Size of the spinner. @default "md" */
  size?: SpinnerSize;
  /** Accessible label announced to screen readers. @default "Loading" */
  label?: string;
}

export function Spinner({ size = "md", label = "Loading", className, ...rest }: SpinnerProps) {
  return (
    <span
      className={["uk-spinner", `uk-spinner--${size}`, className ?? ""].filter(Boolean).join(" ")}
      role="status"
      aria-label={label}
      {...rest}
    />
  );
}
