import { useId } from "react";
import type { ChangeEvent } from "react";
import "../../styles/field.css";
import "./RadioGroup.css";

export interface RadioOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  /** Visible legend/label for the group. */
  label: string;
  /** Name shared by every radio input in the group. */
  name: string;
  /** Options rendered as individual radio buttons. */
  options: RadioOption[];
  /** Currently selected value (controlled). */
  value?: string;
  /** Initial selected value (uncontrolled). */
  defaultValue?: string;
  /** Called with the newly selected value. */
  onChange?: (value: string) => void;
  /** Error message. When present, the group is marked invalid. */
  error?: string;
  /** Helper text shown below the label when there is no error. */
  description?: string;
  /** Lays the options out horizontally instead of vertically. */
  orientation?: "vertical" | "horizontal";
  /** Marks the group as required. */
  required?: boolean;
  /** Disables every option in the group. */
  disabled?: boolean;
}

export function RadioGroup({
  label,
  name,
  options,
  value,
  defaultValue,
  onChange,
  error,
  description,
  orientation = "vertical",
  required,
  disabled,
}: RadioGroupProps) {
  const groupId = useId();
  const descriptionId = description ? `${groupId}-description` : undefined;
  const errorId = error ? `${groupId}-error` : undefined;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  };

  return (
    <fieldset
      className="uk-field uk-radio-group"
      aria-invalid={Boolean(error) || undefined}
      aria-describedby={errorId ?? descriptionId}
      aria-required={required || undefined}
    >
      <legend className="uk-field__label">
        {label}
        {required && (
          <span className="uk-field__required" aria-hidden="true">
            *
          </span>
        )}
      </legend>
      {description && !error && (
        <span id={descriptionId} className="uk-field__description">
          {description}
        </span>
      )}
      <div className={`uk-radio-group__options uk-radio-group__options--${orientation}`}>
        {options.map((option) => {
          const optionId = `${groupId}-${option.value}`;
          return (
            <div className="uk-radio-group__option" key={option.value}>
              <input
                type="radio"
                id={optionId}
                name={name}
                value={option.value}
                disabled={disabled || option.disabled}
                checked={value !== undefined ? value === option.value : undefined}
                defaultChecked={
                  value === undefined && defaultValue !== undefined
                    ? defaultValue === option.value
                    : undefined
                }
                onChange={handleChange}
                className="uk-radio"
              />
              <label htmlFor={optionId} className="uk-radio-group__option-label">
                {option.label}
              </label>
            </div>
          );
        })}
      </div>
      {error && (
        <span id={errorId} className="uk-field__error" role="alert">
          {error}
        </span>
      )}
    </fieldset>
  );
}
