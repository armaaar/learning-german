import { ifTest } from "../ifTest";

describe("ifTest", () => {
  const originalEnv = process.env;
  const testValue = "Test Value";

  describe.each([
    { environment: "development", expectedValue: undefined },
    { environment: "test", expectedValue: testValue },
    { environment: "production", expectedValue: undefined },
  ])(
    'when process.env.NODE_ENV="$environment"',
    ({ environment, expectedValue }) => {
      beforeEach(() => {
        jest.resetModules();
        process.env = {
          ...originalEnv,
          NODE_ENV: environment,
        };
      });

      afterEach(() => {
        process.env = originalEnv;
      });

      it(`should return "${String(expectedValue)}"`, () => {
        expect(ifTest(testValue)).toEqual(expectedValue);
      });
    }
  );
});
