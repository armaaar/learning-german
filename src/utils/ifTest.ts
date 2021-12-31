export const ifTest = <T>(value: T): T | undefined =>
  process.env.NODE_ENV === "test" ? value : undefined;
