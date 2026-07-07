import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TextField } from "./TextField";

describe("TextField", () => {
  it("associates the label with the input", () => {
    render(<TextField label="Email" />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("lets the user type into the field", async () => {
    const user = userEvent.setup();
    render(<TextField label="Email" />);
    const input = screen.getByLabelText("Email");
    await user.type(input, "hello@example.com");
    expect(input).toHaveValue("hello@example.com");
  });

  it("shows a required indicator and sets the required attribute", () => {
    render(<TextField label="Email" required />);
    expect(screen.getByLabelText("Email", { exact: false })).toBeRequired();
  });

  it("renders an error and marks the field invalid", () => {
    render(<TextField label="Email" error="Invalid email" />);
    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("alert")).toHaveTextContent("Invalid email");
  });

  it("prefers error text over description when both are set", () => {
    render(<TextField label="Email" description="helper text" error="bad input" />);
    expect(screen.queryByText("helper text")).not.toBeInTheDocument();
    expect(screen.getByText("bad input")).toBeInTheDocument();
  });
});
