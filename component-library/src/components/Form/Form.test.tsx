import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Form, FormActions } from "./Form";

describe("Form", () => {
  it("prevents default browser submission and reports field values by name", async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();

    render(
      <Form onSubmit={onSubmit}>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" defaultValue="hi@example.com" />
        <button type="submit">Submit</button>
      </Form>,
    );

    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    const [values] = onSubmit.mock.calls[0];
    expect(values).toEqual({ email: "hi@example.com" });
  });

  it("does not throw when submitted without an onSubmit handler", async () => {
    const user = userEvent.setup();
    render(
      <Form>
        <button type="submit">Submit</button>
      </Form>,
    );
    await user.click(screen.getByRole("button", { name: "Submit" }));
  });

  it("renders FormActions children", () => {
    render(
      <FormActions>
        <button>Cancel</button>
      </FormActions>,
    );
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
  });
});
