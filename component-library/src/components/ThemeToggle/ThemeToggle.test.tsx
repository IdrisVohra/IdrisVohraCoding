import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeToggle } from "./ThemeToggle";
import { ThemeProvider } from "../../theme/ThemeProvider";

function renderToggle() {
  return render(
    <ThemeProvider storageKey={false} defaultTheme="light">
      <ThemeToggle />
    </ThemeProvider>,
  );
}

describe("ThemeToggle", () => {
  it("starts in light mode", () => {
    renderToggle();
    expect(screen.getByRole("button")).toHaveAttribute("data-mode", "light");
  });

  it("cycles light -> dark -> system -> light on repeated clicks", async () => {
    const user = userEvent.setup();
    renderToggle();
    const button = screen.getByRole("button");

    await user.click(button);
    expect(button).toHaveAttribute("data-mode", "dark");

    await user.click(button);
    expect(button).toHaveAttribute("data-mode", "system");

    await user.click(button);
    expect(button).toHaveAttribute("data-mode", "light");
  });

  it("shows a system badge only in system mode", async () => {
    const user = userEvent.setup();
    renderToggle();
    expect(screen.queryByText("A")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button"));
    await user.click(screen.getByRole("button"));
    expect(screen.getByText("A")).toBeInTheDocument();
  });
});
