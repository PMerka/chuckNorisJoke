import "@testing-library/jest-dom";
import { testingServer } from "./mocks/server";

beforeAll(() => testingServer.listen({ onUnhandledRequest: "error" }));
afterAll(() => testingServer.close());
afterEach(() => testingServer.resetHandlers());
