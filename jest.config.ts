import type { Config } from "@jest/types";

const esModules = ["lodash-es"].join("|");

const config: Config.InitialOptions = {
  preset: "solid-jest/preset/browser",
  setupFilesAfterEnv: ["<rootDir>/jset-setup.ts"],
  testPathIgnorePatterns: ["node_modules/.*"],
  moduleNameMapper: {
    "^.+\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/cssStub.ts",
  },
  collectCoverage: true,
  coverageReporters: ["text"],
  transformIgnorePatterns: [
    `<rootDir>/node_modules/(?!(${esModules})|(.pnpm/(${esModules})))`,
  ],
};
export default config;
