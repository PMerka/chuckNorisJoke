import { render, screen } from "@testing-library/react";
import App from "./App";
import { vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import * as randomHook from "./hooks/useGetRandomJoke";
import * as categoryHook from "./hooks/useGetRandomJokeByCategory";
import * as searchHook from "./hooks/useSearchJokes";

vi.mock("./hooks/useGetRandomJoke");
vi.mock("./hooks/useGetRandomJokeByCategory");
vi.mock("./hooks/useSearchJokes");

const mockedUseGetRandomJoke = vi.mocked(randomHook.useGetRandomJoke);
const mockedUseGetRandomJokeByCategory = vi.mocked(categoryHook.useGetRandomJokeByCategory);
const mockedUseSearchJokes = vi.mocked(searchHook.useSearchJokes);

const mockJokeItem = {
  categories: ["dev"],
  created_at: "2020-01-01 00:00:00",
  icon_url: "https://example.com/icon.png",
  id: "abc123",
  updated_at: "2020-01-01 00:00:00",
  url: "https://example.com/joke/abc123",
  value: "Funny random joke",
};

const queryClient = new QueryClient();

const renderWithQueryClient = (ui: React.ReactElement) => {
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
};

describe("App component", () => {
  beforeEach(() => {
    mockedUseGetRandomJoke.mockReset();
    mockedUseGetRandomJokeByCategory.mockReset();
    mockedUseSearchJokes.mockReset();
  });

  it("Show random joke on default render", () => {
    mockedUseGetRandomJoke.mockReturnValue({
      data: mockJokeItem,
      isFetching: false,
      error: null,
    } as ReturnType<typeof randomHook.useGetRandomJoke>);

    mockedUseGetRandomJokeByCategory.mockReturnValue({
      data: undefined,
      isFetching: false,
      error: null,
    } as ReturnType<typeof categoryHook.useGetRandomJokeByCategory>);

    mockedUseSearchJokes.mockReturnValue([
      {
        data: undefined,
        isFetching: false,
        error: null,
      },
      vi.fn(),
    ] as unknown as ReturnType<typeof searchHook.useSearchJokes>);

    renderWithQueryClient(<App />);

    expect(screen.getByText(/Funny random joke/)).toBeInTheDocument();
  });
});
