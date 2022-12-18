/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    exclude: ["node_modules"],
    root: "./src",
    environment: "jsdom",
    globals: true,
    coverage: {
      reporter: ["text", "html"],
    },
    setupFiles: "tests/setup-tests.ts",
  },
});
