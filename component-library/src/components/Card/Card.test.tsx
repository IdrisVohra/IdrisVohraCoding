import { render, screen } from "@testing-library/react";
import { Card, CardHeader, CardTitle, CardDescription, CardBody, CardFooter } from "./Card";

describe("Card", () => {
  it("renders composed sub-components", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Plan</CardTitle>
          <CardDescription>Description text</CardDescription>
        </CardHeader>
        <CardBody>Body content</CardBody>
        <CardFooter>Footer content</CardFooter>
      </Card>,
    );
    expect(screen.getByRole("heading", { name: "Plan" })).toBeInTheDocument();
    expect(screen.getByText("Description text")).toBeInTheDocument();
    expect(screen.getByText("Body content")).toBeInTheDocument();
    expect(screen.getByText("Footer content")).toBeInTheDocument();
  });

  it("defaults to the elevated variant", () => {
    render(<Card data-testid="card">Content</Card>);
    expect(screen.getByTestId("card")).toHaveClass("uk-card--elevated");
  });

  it("applies the requested variant", () => {
    render(
      <Card data-testid="card" variant="outlined">
        Content
      </Card>,
    );
    expect(screen.getByTestId("card")).toHaveClass("uk-card--outlined");
  });

  it("adds the interactive class when interactive is true", () => {
    render(
      <Card data-testid="card" interactive>
        Content
      </Card>,
    );
    expect(screen.getByTestId("card")).toHaveClass("uk-card--interactive");
  });
});
