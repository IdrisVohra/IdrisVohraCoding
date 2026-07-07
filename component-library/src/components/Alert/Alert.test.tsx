import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Alert } from "./Alert";

describe("Alert", () => {
  it("renders the title and message", () => {
    render(<Alert title="Heads up">Something happened.</Alert>);
    expect(screen.getByText("Heads up")).toBeInTheDocument();
    expect(screen.getByText("Something happened.")).toBeInTheDocument();
  });

  it("uses role=status for non-danger variants", () => {
    render(<Alert variant="success">Saved</Alert>);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("uses role=alert for the danger variant", () => {
    render(<Alert variant="danger">Failed</Alert>);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("does not render a dismiss button by default", () => {
    render(<Alert>Message</Alert>);
    expect(screen.queryByRole("button", { name: "Dismiss" })).not.toBeInTheDocument();
  });

  it("calls onDismiss when the dismiss button is clicked", async () => {
    const user = userEvent.setup();
    const onDismiss = jest.fn();
    render(<Alert onDismiss={onDismiss}>Message</Alert>);
    await user.click(screen.getByRole("button", { name: "Dismiss" }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });
});
