import getPreviousAndNextQuestion from "./get-prev-and-next-question";

describe("lib/utils/get-prev-and-next-question", () => {
  [
    {
      description: "empty input",
      given: {
        currentPath: "",
        paths: [],
      },
      expected: {
        next: null,
        previous: null,
      },
    },
    {
      description: "one element",
      given: {
        currentPath: "a",
        paths: ["a"],
      },
      expected: {
        next: null,
        previous: null,
      },
    },
    {
      description: "has next element",
      given: {
        currentPath: "a",
        paths: ["a", "b"],
      },
      expected: {
        next: "b",
        previous: null,
      },
    },
    {
      description: "has previous element",
      given: {
        currentPath: "b",
        paths: ["a", "b"],
      },
      expected: {
        next: null,
        previous: "a",
      },
    },
    {
      description: "has next and previous element",
      given: {
        currentPath: "b",
        paths: ["a", "b", "c"],
      },
      expected: {
        next: "c",
        previous: "a",
      },
    },
  ].forEach(({ description, given, expected }) => {
    test(`returns the expected previous and next questions - ${description}`, () => {
      expect(
        getPreviousAndNextQuestion(given.paths, given.currentPath)
      ).toEqual(expected);
    });
  });
});
