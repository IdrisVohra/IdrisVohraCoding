import type { FormEvent, FormHTMLAttributes, HTMLAttributes } from "react";
import "./Form.css";

export interface FormProps extends Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
  /** Called with the form's field values (by `name`) on submit; default browser submission is prevented. */
  onSubmit?: (
    values: Record<string, FormDataEntryValue>,
    event: FormEvent<HTMLFormElement>,
  ) => void;
}

export function Form({ onSubmit, children, className, ...rest }: FormProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (onSubmit) {
      const formData = new FormData(event.currentTarget);
      const values = Object.fromEntries(formData.entries());
      onSubmit(values, event);
    }
  };

  return (
    <form
      className={["uk-form", className ?? ""].filter(Boolean).join(" ")}
      onSubmit={handleSubmit}
      noValidate
      {...rest}
    >
      {children}
    </form>
  );
}

export type FormActionsProps = HTMLAttributes<HTMLDivElement>;

/** Layout helper for placing action buttons (e.g. Submit/Cancel) at the end of a form. */
export function FormActions({ children, className, ...rest }: FormActionsProps) {
  return (
    <div className={["uk-form-actions", className ?? ""].filter(Boolean).join(" ")} {...rest}>
      {children}
    </div>
  );
}
