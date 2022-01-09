type Descripted<T> = {
  [K in keyof T]: {
    readonly value: T[K];
    readonly key: string;
  };
}[keyof T];

/**
 * Helper to produce an array of enum descriptors.
 * @param enumeration Enumeration object.
 * @param separatorRegex Regex that would catch the separator in your enum key.
 */
export function enumToDescriptiveArray<T>(
  enumeration: T,
  separatorRegex = /_/g
): Descripted<T>[] {
  return (Object.keys(enumeration) as Array<keyof T>)
    .filter((key) => Number.isNaN(Number(key)))
    .filter(
      (key) =>
        typeof enumeration[key] === "number" ||
        typeof enumeration[key] === "string"
    )
    .map((key) => ({
      value: enumeration[key],
      key: String(key).replace(separatorRegex, " "),
    }));
}
