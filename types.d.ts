export type Path = string;
export type PossibleAnswer = string;

export interface TopicMeta {
  title: string;
}

export interface QuestionFile {
  title: string;
  question: string;
  hint: string;
  possible_answers: PossibleAnswer[];
  correct_answers: string[];
  explanation: string;
  tags: string[];
  credit: string[];
}

export interface GetPreviousAndNextQuestionResponse {
  previous: Path | null;
  next: Path | null;
}

export interface TopicPathing {
  path: Path;
  dir: string;
  topicFilePath: Path;
}
