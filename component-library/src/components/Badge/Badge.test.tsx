import { render, screen } from "@testing-library/react";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders its children", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("defaults to the default variant and md size", () => {
    render(<Badge>New</Badge>);
    const badge = screen.getByText("New");
    expect(badge).toHaveClass("uk-badge--default");
    expect(badge).toHaveClass("uk-badge--md");
  });

  it("applies the requested variant and size", () => {
    render(
      <Badge variant="danger" size="sm">
        Failed
      </Badge>,
    );
    const badge = screen.getByText("Failed");
    expect(badge).toHaveClass("uk-badge--danger");
    expect(badge).toHaveClass("uk-badge--sm");
  });

  it("renders a dot indicator when dot is true", () => {
    const { container } = render(<Badge dot>Online</Badge>);
    expect(container.querySelector(".uk-badge__dot")).toBeInTheDocument();
  });

  it("does not render a dot by default", () => {
    const { container } = render(<Badge>Online</Badge>);
    expect(container.querySelector(".uk-badge__dot")).not.toBeInTheDocument();
  });
});
