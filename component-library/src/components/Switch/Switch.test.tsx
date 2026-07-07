import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Switch } from "./Switch";

describe("Switch", () => {
  it("associates the label with the switch", () => {
    render(<Switch label="Enable notifications" />);
    expect(screen.getByRole("switch", { name: "Enable notifications" })).toBeInTheDocument();
  });

  it("toggles when clicked", async () => {
    const user = userEvent.setup();
    render(<Switch label="Enable notifications" />);
    const toggle = screen.getByRole("switch") as HTMLInputElement;
    expect(toggle.checked).toBe(false);
    await user.click(toggle);
    expect(toggle.checked).toBe(true);
  });

  it("renders as checked when defaultChecked is set", () => {
    render(<Switch label="Enable notifications" defaultChecked />);
    expect(screen.getByRole("switch")).toBeChecked();
  });

  it("renders description text", () => {
    render(<Switch label="Enable notifications" description="Helper text" />);
    expect(screen.getByText("Helper text")).toBeInTheDocument();
  });

  it("does not toggle when disabled", async () => {
    const user = userEvent.setup();
    render(<Switch label="Enable notifications" disabled />);
    const toggle = screen.getByRole("switch") as HTMLInputElement;
    await user.click(toggle);
    expect(toggle.checked).toBe(false);
  });
});
