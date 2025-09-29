import { render, screen, fireEvent } from "@testing-library/react";
import CategorySelect from "./CategorySelect";
import { vi } from "vitest";
import { useGetJokeCategories } from "../hooks/useGetJokeCategories";

vi.mock("../hooks/useGetJokeCategories");
const mockedUseGetJokeCategories = vi.mocked(useGetJokeCategories);

describe("CategorySelect", () => {
  it("shows loading state for category loading state", () => {
    mockedUseGetJokeCategories.mockReturnValue({
      isLoading: true,
      isError: false,
      data: undefined,
      error: null,
    } as ReturnType<typeof useGetJokeCategories>);

    render(<CategorySelect setSearchCategory={vi.fn()} />);
    expect(screen.getByText(/Loading/)).toBeInTheDocument();
  });

  it("shows categories, allows selection and submit", () => {
    mockedUseGetJokeCategories.mockReturnValue({
      isLoading: false,
      isError: false,
      data: ["dev", "movie"],
      error: null,
    } as ReturnType<typeof useGetJokeCategories>);

    const setSearchCategory = vi.fn();
    render(<CategorySelect setSearchCategory={setSearchCategory} />);

    fireEvent.mouseDown(screen.getByLabelText(/Category/i));
    fireEvent.click(screen.getByText("dev"));

    const button = screen.getByRole("button", { name: /Get Joke About dev/i });
    fireEvent.click(button);

    expect(setSearchCategory).toHaveBeenCalledWith("dev");
  });

  it("button is disabled if no category is selected", () => {
    mockedUseGetJokeCategories.mockReturnValue({
      isLoading: false,
      isError: false,
      data: ["dev", "movie"],
      error: null,
    } as ReturnType<typeof useGetJokeCategories>);

    const setSearchCategory = vi.fn();
    render(<CategorySelect setSearchCategory={setSearchCategory} />);

    const button = screen.getByRole("button", { name: /Please select category/i });
    expect(button).toBeDisabled();

    fireEvent.mouseDown(screen.getByLabelText(/Category/i)); // otevření selectu
    fireEvent.click(screen.getByText("dev")); // kliknutí na "dev"

    expect(screen.getByRole("button", { name: /Get Joke About dev/i })).toBeEnabled();
  });

  it("shows error state if fetch fails", () => {
    mockedUseGetJokeCategories.mockReturnValue({
      isLoading: false,
      isError: true,
      data: undefined,
      error: new Error("Network error"),
    } as ReturnType<typeof useGetJokeCategories>);

    render(<CategorySelect setSearchCategory={vi.fn()} />);
    expect(screen.getByText(/Failed to load categories/)).toBeInTheDocument();
    expect(screen.getByText(/Network error/)).toBeInTheDocument();
  });
});
