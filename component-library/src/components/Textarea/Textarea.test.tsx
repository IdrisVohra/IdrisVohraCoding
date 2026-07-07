import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Textarea } from "./Textarea";

describe("Textarea", () => {
  it("associates the label with the textarea", () => {
    render(<Textarea label="Message" />);
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
  });

  it("lets the user type multiline text", async () => {
    const user = userEvent.setup();
    render(<Textarea label="Message" />);
    const textarea = screen.getByLabelText("Message");
    await user.type(textarea, "Hello{enter}World");
    expect(textarea).toHaveValue("Hello\nWorld");
  });

  it("renders an error and marks the field invalid", () => {
    render(<Textarea label="Message" error="Required" />);
    const textarea = screen.getByLabelText("Message");
    expect(textarea).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("alert")).toHaveTextContent("Required");
  });

  it("defaults to 4 rows", () => {
    render(<Textarea label="Message" />);
    expect(screen.getByLabelText("Message")).toHaveAttribute("rows", "4");
  });
});
