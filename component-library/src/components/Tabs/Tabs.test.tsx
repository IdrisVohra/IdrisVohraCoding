import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tabs } from "./Tabs";

const items = [
  { value: "a", label: "Tab A", content: <p>Content A</p> },
  { value: "b", label: "Tab B", content: <p>Content B</p> },
  { value: "c", label: "Tab C", content: <p>Content C</p>, disabled: true },
];

describe("Tabs", () => {
  it("shows the first tab's content by default", () => {
    render(<Tabs items={items} />);
    expect(screen.getByText("Content A")).toBeVisible();
    expect(screen.getByRole("tab", { name: "Tab A" })).toHaveAttribute("aria-selected", "true");
  });

  it("respects defaultValue", () => {
    render(<Tabs items={items} defaultValue="b" />);
    expect(screen.getByText("Content B")).toBeVisible();
  });

  it("switches tabs on click", async () => {
    const user = userEvent.setup();
    render(<Tabs items={items} />);
    await user.click(screen.getByRole("tab", { name: "Tab B" }));
    expect(screen.getByText("Content B")).toBeVisible();
    expect(screen.getByRole("tab", { name: "Tab B" })).toHaveAttribute("aria-selected", "true");
  });

  it("disables the configured tab", () => {
    render(<Tabs items={items} />);
    expect(screen.getByRole("tab", { name: "Tab C" })).toBeDisabled();
  });

  it("navigates with arrow keys, skipping disabled tabs", async () => {
    const user = userEvent.setup();
    render(<Tabs items={items} />);
    const tabA = screen.getByRole("tab", { name: "Tab A" });
    tabA.focus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Tab B" })).toHaveFocus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Tab A" })).toHaveFocus();
  });

  it("calls onChange with the selected value", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<Tabs items={items} onChange={onChange} />);
    await user.click(screen.getByRole("tab", { name: "Tab B" }));
    expect(onChange).toHaveBeenCalledWith("b");
  });
});
