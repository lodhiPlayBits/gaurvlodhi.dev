import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Logo } from "./Logo";

describe("Logo", () => {
  it("renders an svg with accessible name matching /Gaurav Lodhi/i", () => {
    render(<Logo />);
    expect(screen.getByRole("img", { name: /Gaurav Lodhi/i })).toBeInTheDocument();
  });

  it("renders wordmark 'lodhiPlayBits' when withWordmark is true", () => {
    render(<Logo withWordmark />);
    expect(screen.getByText("lodhiPlayBits")).toBeInTheDocument();
  });

  it("does NOT render wordmark by default", () => {
    render(<Logo />);
    expect(screen.queryByText("lodhiPlayBits")).not.toBeInTheDocument();
  });
});
