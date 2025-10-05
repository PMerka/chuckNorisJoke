import "@testing-library/jest-dom";
import { testingServer } from "./test/mocks/server";
import { cleanup } from "@testing-library/react";

beforeAll(() => testingServer.listen());
afterEach(() => {
  testingServer.resetHandlers();
  cleanup();
});
afterAll(() => testingServer.close());
