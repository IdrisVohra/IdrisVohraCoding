import { render, screen } from "@testing-library/react";
import { Spinner } from "./Spinner";

describe("Spinner", () => {
  it("renders with a status role and default label", () => {
    render(<Spinner />);
    expect(screen.getByRole("status", { name: "Loading" })).toBeInTheDocument();
  });

  it("accepts a custom label", () => {
    render(<Spinner label="Fetching results" />);
    expect(screen.getByRole("status", { name: "Fetching results" })).toBeInTheDocument();
  });

  it("defaults to the md size", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toHaveClass("uk-spinner--md");
  });

  it("applies the requested size", () => {
    render(<Spinner size="lg" />);
    expect(screen.getByRole("status")).toHaveClass("uk-spinner--lg");
  });
});
