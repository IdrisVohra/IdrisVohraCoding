import { render, screen, fireEvent } from "@testing-library/react";
import { Avatar } from "./Avatar";

describe("Avatar", () => {
  it("renders initials from a two-word name", () => {
    render(<Avatar name="Ada Lovelace" />);
    expect(screen.getByText("AL")).toBeInTheDocument();
  });

  it("renders initials from a single-word name", () => {
    render(<Avatar name="Cher" />);
    expect(screen.getByText("CH")).toBeInTheDocument();
  });

  it("exposes the name as the accessible label", () => {
    render(<Avatar name="Grace Hopper" />);
    expect(screen.getByRole("img", { name: "Grace Hopper" })).toBeInTheDocument();
  });

  it("renders an image when src is provided", () => {
    render(<Avatar name="Grace Hopper" src="https://example.com/avatar.jpg" />);
    expect(screen.getByRole("img", { name: "Grace Hopper" }).querySelector("img")).toHaveAttribute(
      "src",
      "https://example.com/avatar.jpg",
    );
  });

  it("falls back to initials when the image fails to load", () => {
    render(<Avatar name="Grace Hopper" src="https://example.com/broken.jpg" />);
    const img = screen.getByRole("img", { name: "Grace Hopper" }).querySelector("img")!;
    fireEvent.error(img);
    expect(screen.getByText("GH")).toBeInTheDocument();
  });

  it("renders a status indicator when provided", () => {
    const { container } = render(<Avatar name="Grace Hopper" status="online" />);
    expect(container.querySelector(".uk-avatar__status--online")).toBeInTheDocument();
  });
});
