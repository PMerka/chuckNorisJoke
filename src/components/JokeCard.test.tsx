import { render, screen } from "@testing-library/react";
import JokeCard from "../components/JokeCard";

describe("JokeCard", () => {
  it("shows the joke and category", () => {
    render(<JokeCard joke={"Test joke"} category={["test-category"]} />);

    expect(screen.getByText(/Test joke/)).toBeInTheDocument();
    expect(screen.getByText(/test-category/)).toBeInTheDocument();
  });
});
