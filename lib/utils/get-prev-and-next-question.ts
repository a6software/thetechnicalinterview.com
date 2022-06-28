import { GetPreviousAndNextQuestionResponse, Path } from "../../types";

const getPreviousAndNextQuestion = (
  paths: Path[],
  currentPath: Path
): GetPreviousAndNextQuestionResponse => {
  const index = paths.findIndex((p) => p === currentPath);

  return {
    previous: paths[index - 1] ?? null,
    next: paths[index + 1] ?? null,
  };
};

export default getPreviousAndNextQuestion;
