import type { HTMLAttributes, ReactNode } from "react";
import "./Alert.css";

export type AlertVariant = "info" | "success" | "warning" | "danger";

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** Semantic color/icon of the alert. @default "info" */
  variant?: AlertVariant;
  /** Optional bold title shown above the message. */
  title?: ReactNode;
  /** Called when the dismiss button is clicked. Omit to render a non-dismissible alert. */
  onDismiss?: () => void;
}

const ICONS: Record<AlertVariant, ReactNode> = {
  info: (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.5a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9 9a1 1 0 0 0 0 2v3a1 1 0 0 0 1 1h.5a1 1 0 1 0 0-2V10a1 1 0 0 0-1-1H9Z" />
    </svg>
  ),
  success: (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
        clipRule="evenodd"
      />
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.63-1.516 2.63H3.72c-1.347 0-2.189-1.463-1.516-2.63L8.485 2.495ZM10 6a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 6Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
        clipRule="evenodd"
      />
    </svg>
  ),
  danger: (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z"
        clipRule="evenodd"
      />
    </svg>
  ),
};

export function Alert({
  variant = "info",
  title,
  onDismiss,
  className,
  children,
  ...rest
}: AlertProps) {
  return (
    <div
      className={["uk-alert", `uk-alert--${variant}`, className ?? ""].filter(Boolean).join(" ")}
      role={variant === "danger" ? "alert" : "status"}
      {...rest}
    >
      <span className="uk-alert__icon">{ICONS[variant]}</span>
      <div className="uk-alert__content">
        {title && <p className="uk-alert__title">{title}</p>}
        <div className="uk-alert__message">{children}</div>
      </div>
      {onDismiss && (
        <button
          type="button"
          className="uk-alert__dismiss"
          onClick={onDismiss}
          aria-label="Dismiss"
        >
          &times;
        </button>
      )}
    </div>
  );
}
