import { expect, beforeAll, afterEach, afterAll, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";

import { server } from "./mocks/server.js";
import { handlers } from "./mocks/handlers.js";

const mockedLocalForage = new Map();
vi.mock("localforage", () => ({
  default: {
    getItem: vi.fn(async (key) => mockedLocalForage.get(key)),
    setItem: vi.fn(async (key, data) => mockedLocalForage.set(key, data)),
    clear: vi.fn(async () => mockedLocalForage.clear()),
  },
}));

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

// Start server before all tests
beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });
  server.use(...handlers);
});

//  Close server after all tests
afterAll(() => {
  server.close();
});

// Reset handlers after each test `important for test isolation`
afterEach(() => {
  cleanup();
  server.resetHandlers();
});
