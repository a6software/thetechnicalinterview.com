import { isValidUrl } from "./is-valid-url";

type IsValidTestInputAndExpectation = [null | string, boolean][];

describe("isValidUrl", () => {
  (
    [
      [null, false],
      ["", false],
      ["null", false],
      ["http://", false],
      ["https://", false],
      ["https://codereviewvideos.com", true],
      ["https://www.codereviewvideos.com", true],
      [
        "https://learn.microsoft.com/dotnet/core/tutorials/top-level-templates",
        true,
      ],
    ] as IsValidTestInputAndExpectation
  ).forEach(([given, expected]) => {
    test(`given: ${given}, expected: ${expected}`, () => {
      expect(isValidUrl(given)).toEqual(expected);
    });
  });
});
