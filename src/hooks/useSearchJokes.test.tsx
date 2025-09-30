import { renderHook, act, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSearchJokes } from "./useSearchJokes";
import type { SearchJokesResponse } from "../types/apiData";
import { vi, type MockedFunction } from "vitest";
import axios from "../utils/axios";

const mockedAxiosGet = axios.get as MockedFunction<typeof axios.get>;

const mockResponse: SearchJokesResponse = {
  total: 3,
  result: [
    {
      id: "1",
      value: "joke 1",
      categories: [],
      created_at: "",
      updated_at: "",
      icon_url: "",
      url: "",
    },
    {
      id: "2",
      value: "joke 2",
      categories: [],
      created_at: "",
      updated_at: "",
      icon_url: "",
      url: "",
    },
    {
      id: "3",
      value: "joke 3",
      categories: [],
      created_at: "",
      updated_at: "",
      icon_url: "",
      url: "",
    },
  ],
};

vi.mock("../utils/axios", () => ({
  default: { get: vi.fn() },
}));

const createWrapper = () => {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

beforeEach(() => {
  vi.restoreAllMocks();
  mockedAxiosGet.mockResolvedValue({ data: mockResponse });
});

describe("useSearchJokes hook", () => {
  it("returns fallback if no results", async () => {
    const emptyResponse: SearchJokesResponse = { total: 0, result: [] };
    mockedAxiosGet.mockResolvedValueOnce({ data: emptyResponse });

    const { result } = renderHook(() => useSearchJokes("abc"), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current[0].isSuccess).toBe(true));

    expect(result.current[0].data.value).toMatch(/No jokes found/);
  });

  it("picks joke based on mocked randomSeed", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0);

    const { result } = renderHook(() => useSearchJokes("abc"), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current[0].isSuccess).toBe(true));

    expect(result.current[0].data.value).toBe("joke 1");
  });

  it("joke is updated based if updateRandomSeed is triggered", async () => {
    vi.spyOn(Math, "random").mockReturnValueOnce(0);

    const { result } = renderHook(() => useSearchJokes("abc"), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current[0].isSuccess).toBe(true));
    expect(result.current[0].data.value).toBe("joke 1");

    vi.spyOn(Math, "random").mockReturnValueOnce(0.9);

    act(() => {
      result.current[1]();
    });

    expect(result.current[0].data.value).toBe("joke 3");
  });
});
