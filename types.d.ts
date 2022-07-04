export type PossibleAnswer = string;

export interface QuestionFile {
  question: string;
  hint: string;
  possible_answers: PossibleAnswer[];
  correct_answers: string[];
  explanation: string;
  tags: string[];
  credit: string;
}

export interface GetPreviousAndNextQuestionResponse {
  previous: Path | null;
  next: Path | null;
}

export type Path = string;
