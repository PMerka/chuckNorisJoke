import { render, screen } from "@testing-library/react";
import JokeCard from "./JokeCard";
import { AxiosError } from "axios";

describe("JokeCard", () => {
  it("renders joke and category chips", () => {
    render(<JokeCard joke="Test joke" category={["test-category"]} dataSource="random" />);

    expect(screen.getByText(/Random joke from all jokes:/)).toBeInTheDocument();
    expect(screen.getByText(/Test joke/)).toBeInTheDocument();
    expect(screen.getByText(/test-category/)).toBeInTheDocument();
  });

  it("renders error state", () => {
    render(<JokeCard error={new AxiosError("Network error")} />);

    expect(screen.getByText(/Error detail: Network error/)).toBeInTheDocument();
  });

  it("renders loading state", () => {
    render(<JokeCard isLoading={true} />);

    expect(screen.getByText(/Loading/)).toBeInTheDocument();
    expect(screen.getByText(/Chuck Norris doesn't wait for API/)).toBeInTheDocument();
  });
});
