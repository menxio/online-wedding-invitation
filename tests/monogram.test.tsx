import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Monogram } from "@/components/brand/monogram";

describe("Monogram", () => {
  it("renders configurable initials in the primary and compact identity", () => {
    render(
      <>
        <Monogram initials="A & W" />
        <Monogram initials="A & W" compact />
      </>,
    );

    expect(screen.getByRole("img", { name: "A and W wedding monogram" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "A and W monogram" })).toBeInTheDocument();
    expect(screen.getAllByText("A", { selector: "tspan" })).toHaveLength(2);
    expect(screen.getAllByText("W", { selector: "tspan" })).toHaveLength(2);
  });

  it("does not introduce instance-colliding SVG ids", () => {
    const { container } = render(
      <>
        <Monogram initials="M & M" />
        <Monogram initials="M & M" compact />
      </>,
    );

    expect(container.querySelectorAll("[id]")).toHaveLength(0);
  });
});
