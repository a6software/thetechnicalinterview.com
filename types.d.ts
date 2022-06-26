export type PossibleAnswer = string;

export type QuestionFile = {
  question: string;
  hint: string;
  possible_answers: string[];
  correct_answers: string[];
  explanation: string;
  tags: string[];
  credit: string;
};
