import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RadioGroup } from "./RadioGroup";

const options = [
  { label: "Small", value: "sm" },
  { label: "Medium", value: "md" },
  { label: "Large", value: "lg", disabled: true },
];

describe("RadioGroup", () => {
  it("renders the group legend and all options", () => {
    render(<RadioGroup label="Size" name="size" options={options} />);
    expect(screen.getByText("Size")).toBeInTheDocument();
    expect(screen.getByLabelText("Small")).toBeInTheDocument();
    expect(screen.getByLabelText("Medium")).toBeInTheDocument();
    expect(screen.getByLabelText("Large")).toBeInTheDocument();
  });

  it("selects the defaultValue option", () => {
    render(<RadioGroup label="Size" name="size" options={options} defaultValue="md" />);
    expect(screen.getByLabelText("Medium")).toBeChecked();
    expect(screen.getByLabelText("Small")).not.toBeChecked();
  });

  it("disables individual options", () => {
    render(<RadioGroup label="Size" name="size" options={options} />);
    expect(screen.getByLabelText("Large")).toBeDisabled();
  });

  it("calls onChange with the selected value in controlled mode", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(
      <RadioGroup
        label="Size"
        name="size"
        options={options}
        value="sm"
        onChange={onChange}
      />,
    );
    await user.click(screen.getByLabelText("Medium"));
    expect(onChange).toHaveBeenCalledWith("md");
  });

  it("renders an error message", () => {
    render(<RadioGroup label="Size" name="size" options={options} error="Required" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Required");
  });
});
