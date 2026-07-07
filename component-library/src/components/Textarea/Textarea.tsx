import { forwardRef, useId } from "react";
import type { TextareaHTMLAttributes } from "react";
import "../../styles/field.css";
import "./Textarea.css";

export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id"> {
  /** Visible label for the field. */
  label: string;
  /** Error message. When present, the field is marked invalid. */
  error?: string;
  /** Helper text shown below the label when there is no error. */
  description?: string;
  /** Custom id. Auto-generated when omitted. */
  id?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, description, id, required, className, rows = 4, ...rest }, ref) => {
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
        <textarea
          ref={ref}
          id={fieldId}
          rows={rows}
          className={["uk-textarea", error ? "uk-textarea--error" : ""]
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

Textarea.displayName = "Textarea";
