import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Select } from "./Select";

const options = [
  { label: "Red", value: "red" },
  { label: "Green", value: "green" },
  { label: "Blue", value: "blue", disabled: true },
];

describe("Select", () => {
  it("associates the label and renders all options", () => {
    render(<Select label="Color" options={options} />);
    const select = screen.getByLabelText("Color");
    expect(select).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Red" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Green" })).toBeInTheDocument();
  });

  it("renders a disabled placeholder option when provided", () => {
    render(<Select label="Color" options={options} placeholder="Choose a color" />);
    const placeholderOption = screen.getByRole("option", { name: "Choose a color" });
    expect(placeholderOption).toBeDisabled();
  });

  it("lets the user choose an option", async () => {
    const user = userEvent.setup();
    render(<Select label="Color" options={options} />);
    const select = screen.getByLabelText("Color") as HTMLSelectElement;
    await user.selectOptions(select, "green");
    expect(select.value).toBe("green");
  });

  it("disables individual options", () => {
    render(<Select label="Color" options={options} />);
    expect(screen.getByRole("option", { name: "Blue" })).toBeDisabled();
  });

  it("renders an error and marks the field invalid", () => {
    render(<Select label="Color" options={options} error="Required" />);
    expect(screen.getByLabelText("Color")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("alert")).toHaveTextContent("Required");
  });
});
