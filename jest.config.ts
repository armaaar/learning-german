import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "solid-jest/preset/browser",
  setupFilesAfterEnv: ["./jset-setup.ts"],
  testPathIgnorePatterns: ["node_modules/.*"],
  moduleNameMapper: {
    "^.+\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/cssStub.ts",
  },
};
export default config;
