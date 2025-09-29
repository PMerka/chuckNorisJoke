/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // ← tohle zapni
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
  },
});
