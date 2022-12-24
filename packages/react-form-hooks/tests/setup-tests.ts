import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => cleanup());

console.error = vi.fn();
console.warn = vi.fn();
