import { forwardRef, useId } from "react";
import type { InputHTMLAttributes } from "react";
import "../../styles/field.css";
import "./Checkbox.css";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "type"> {
  /** Visible label for the checkbox. */
  label: string;
  /** Error message. When present, the field is marked invalid. */
  error?: string;
  /** Helper text shown below the label when there is no error. */
  description?: string;
  /** Custom id. Auto-generated when omitted. */
  id?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, description, id, className, ...rest }, ref) => {
    const generatedId = useId();
    const fieldId = id ?? generatedId;
    const descriptionId = description ? `${fieldId}-description` : undefined;
    const errorId = error ? `${fieldId}-error` : undefined;

    return (
      <div className={["uk-checkbox-field", className ?? ""].filter(Boolean).join(" ")}>
        <div className="uk-checkbox-field__row">
          <input
            ref={ref}
            id={fieldId}
            type="checkbox"
            className="uk-checkbox"
            aria-invalid={Boolean(error) || undefined}
            aria-describedby={errorId ?? descriptionId}
            {...rest}
          />
          <label htmlFor={fieldId} className="uk-checkbox-field__label">
            {label}
          </label>
        </div>
        {description && !error && (
          <span id={descriptionId} className="uk-field__description">
            {description}
          </span>
        )}
        {error && (
          <span id={errorId} className="uk-field__error" role="alert">
            {error}
          </span>
        )}
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";
