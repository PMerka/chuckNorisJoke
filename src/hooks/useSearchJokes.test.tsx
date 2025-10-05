import { renderHook, act, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSearchJokes } from "./useSearchJokes";
import { vi } from "vitest";
import { testingServer } from "src/test/mocks/server";
import { http, HttpResponse } from "msw";
import apiRoutes, { VITE_API_URL } from "src/constants/apiRoutes";

const createWrapper = () => {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useSearchJokes hook", () => {
  it("returns fallback if no results", async () => {
    testingServer.use(
      http.get(`${VITE_API_URL}${apiRoutes.search}`, () => {
        return HttpResponse.json({ total: 0, result: [] }, { status: 200 });
      })
    );
    const { result } = renderHook(() => useSearchJokes("abc"), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current[0].isSuccess).toBe(true));

    expect(result.current[0].data.value).toMatch(/No jokes found/);
  });

  it("picks joke based on mocked randomSeed", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0);

    const { result } = renderHook(() => useSearchJokes("abc"), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current[0].isSuccess).toBe(true));

    expect(result.current[0].data.value).toBe("1st funny joke with abc");
  });

  it("joke is updated based if updateRandomSeed is triggered", async () => {
    vi.spyOn(Math, "random").mockReturnValueOnce(0);

    const { result } = renderHook(() => useSearchJokes("abc"), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current[0].isSuccess).toBe(true));
    expect(result.current[0].data.value).toBe("1st funny joke with abc");

    vi.spyOn(Math, "random").mockReturnValueOnce(0.9);

    act(() => {
      result.current[1]();
    });

    expect(result.current[0].data.value).toBe("2nd funny joke with abc");
  });
});
