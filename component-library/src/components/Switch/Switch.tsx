import { forwardRef, useId } from "react";
import type { InputHTMLAttributes } from "react";
import "../../styles/field.css";
import "./Switch.css";

export interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "type"> {
  /** Visible label for the switch. */
  label: string;
  /** Helper text shown below the label. */
  description?: string;
  /** Custom id. Auto-generated when omitted. */
  id?: string;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, description, id, className, ...rest }, ref) => {
    const generatedId = useId();
    const fieldId = id ?? generatedId;
    const descriptionId = description ? `${fieldId}-description` : undefined;

    return (
      <div className={["uk-switch-field", className ?? ""].filter(Boolean).join(" ")}>
        <div className="uk-switch-field__row">
          <label htmlFor={fieldId} className="uk-switch-field__label">
            {label}
          </label>
          <input
            ref={ref}
            id={fieldId}
            type="checkbox"
            role="switch"
            className="uk-switch"
            aria-describedby={descriptionId}
            {...rest}
          />
        </div>
        {description && (
          <span id={descriptionId} className="uk-field__description">
            {description}
          </span>
        )}
      </div>
    );
  },
);

Switch.displayName = "Switch";
