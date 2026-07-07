import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  it("associates the label with the checkbox", () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByLabelText("Accept terms")).toBeInTheDocument();
  });

  it("toggles when clicked", async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Accept terms" />);
    const checkbox = screen.getByLabelText("Accept terms") as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
    await user.click(checkbox);
    expect(checkbox.checked).toBe(true);
  });

  it("renders as checked when defaultChecked is set", () => {
    render(<Checkbox label="Accept terms" defaultChecked />);
    expect(screen.getByLabelText("Accept terms")).toBeChecked();
  });

  it("renders an error and marks the field invalid", () => {
    render(<Checkbox label="Accept terms" error="Required" />);
    expect(screen.getByLabelText("Accept terms")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("alert")).toHaveTextContent("Required");
  });
});
