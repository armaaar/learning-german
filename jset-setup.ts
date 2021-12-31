/* eslint-disable import/no-extraneous-dependencies */
import "@testing-library/jest-dom/extend-expect";
import "regenerator-runtime";

// Mock router
jest.mock("solid-app-router", () => ({
  useSearchParams: () => [{}, jest.fn()],
}));
