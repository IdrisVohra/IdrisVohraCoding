import { forwardRef, useId } from "react";
import type { InputHTMLAttributes } from "react";
import "../../styles/field.css";
import "./TextField.css";

export interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "id"> {
  /** Visible label for the field. */
  label: string;
  /** Error message. When present, the field is marked invalid. */
  error?: string;
  /** Helper text shown below the label when there is no error. */
  description?: string;
  /** Custom id. Auto-generated when omitted. */
  id?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, description, id, required, className, ...rest }, ref) => {
    const generatedId = useId();
    const fieldId = id ?? generatedId;
    const descriptionId = description ? `${fieldId}-description` : undefined;
    const errorId = error ? `${fieldId}-error` : undefined;

    return (
      <div className={["uk-field", className ?? ""].filter(Boolean).join(" ")}>
        <label htmlFor={fieldId} className="uk-field__label">
          {label}
          {required && (
            <span className="uk-field__required" aria-hidden="true">
              *
            </span>
          )}
        </label>
        {description && !error && (
          <span id={descriptionId} className="uk-field__description">
            {description}
          </span>
        )}
        <input
          ref={ref}
          id={fieldId}
          className={["uk-text-field", error ? "uk-text-field--error" : ""]
            .filter(Boolean)
            .join(" ")}
          required={required}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={errorId ?? descriptionId}
          {...rest}
        />
        {error && (
          <span id={errorId} className="uk-field__error" role="alert">
            {error}
          </span>
        )}
      </div>
    );
  },
);

TextField.displayName = "TextField";
