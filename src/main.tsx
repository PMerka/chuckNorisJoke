import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "@emotion/react";
import theme from "./constants/ThemeMUI.ts";
import { QueryClient, QueryClientProvider, QueryCache } from "@tanstack/react-query";
import ErrorBoundary from "./components/ErrorBoundery.tsx";
import ErrorPage from "./components/ErrorPage.tsx";

const queryCache = new QueryCache({
  onError: () => {
    // global error handler if needed
  },
  onSuccess: () => {
    // global success handler if needed
  },
});

const queryClient = new QueryClient({
  queryCache,
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <ErrorBoundary fallback={<ErrorPage />}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </ErrorBoundary>
    </ThemeProvider>
  </StrictMode>
);
