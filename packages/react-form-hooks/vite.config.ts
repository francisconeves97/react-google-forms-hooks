import { defineConfig } from "vite";

export default defineConfig({
  plugins: [],
  test: {
    exclude: ["**/node_modules/**"],
    root: "./src",
    environment: "jsdom",
    coverage: {
      reporter: ["text", "html"],
      exclude: ["**/node_modules/**"],
    },
  },
});
