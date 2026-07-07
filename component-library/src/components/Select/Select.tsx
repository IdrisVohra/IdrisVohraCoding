import { forwardRef, useId } from "react";
import type { SelectHTMLAttributes } from "react";
import "../../styles/field.css";
import "./Select.css";

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "id"> {
  /** Visible label for the field. */
  label: string;
  /** Options rendered inside the select. */
  options: SelectOption[];
  /** Error message. When present, the field is marked invalid. */
  error?: string;
  /** Helper text shown below the label when there is no error. */
  description?: string;
  /** Placeholder shown as a disabled first option when no value is selected. */
  placeholder?: string;
  /** Custom id. Auto-generated when omitted. */
  id?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      options,
      error,
      description,
      placeholder,
      id,
      required,
      className,
      defaultValue,
      ...rest
    },
    ref,
  ) => {
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
        <select
          ref={ref}
          id={fieldId}
          className={["uk-select", error ? "uk-select--error" : ""]
            .filter(Boolean)
            .join(" ")}
          required={required}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={errorId ?? descriptionId}
          defaultValue={defaultValue ?? (placeholder ? "" : undefined)}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <span id={errorId} className="uk-field__error" role="alert">
            {error}
          </span>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";
