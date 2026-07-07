import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import "./Button.css";

export type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style of the button. @default "primary" */
  variant?: ButtonVariant;
  /** Size of the button. @default "md" */
  size?: ButtonSize;
  /** Shows a loading spinner and disables interaction. */
  isLoading?: boolean;
  /** Icon rendered before the label. */
  startIcon?: ReactNode;
  /** Icon rendered after the label. */
  endIcon?: ReactNode;
  /** Stretches the button to fill its container width. */
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      startIcon,
      endIcon,
      fullWidth = false,
      disabled,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const classes = [
      "uk-button",
      `uk-button--${variant}`,
      `uk-button--${size}`,
      fullWidth ? "uk-button--full-width" : "",
      isLoading ? "uk-button--loading" : "",
      className ?? "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || isLoading}
        aria-busy={isLoading || undefined}
        {...rest}
      >
        {isLoading && (
          <span className="uk-button__spinner" aria-hidden="true" data-testid="button-spinner" />
        )}
        {!isLoading && startIcon && (
          <span className="uk-button__icon uk-button__icon--start">{startIcon}</span>
        )}
        <span className="uk-button__label">{children}</span>
        {!isLoading && endIcon && (
          <span className="uk-button__icon uk-button__icon--end">{endIcon}</span>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";
