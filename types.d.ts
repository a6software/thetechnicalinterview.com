export type Path = string;
export type PossibleAnswer = string;

export interface TopicMeta {
  title: string;
  icon: string;
  introduction: string;
}

export interface QuestionFile {
  title: string;
  question: string;
  hint: string | null;
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

export interface AvailableQuestion {
  path: string;
  number: string; // gotta love those leading zeros
  title: string;
}

export interface TopicListing {
  dir: TopicPathing["dir"];
  title: TopicMeta["title"];
  icon: TopicMeta["icon"];
}
