import fs from "fs/promises";
import path from "path";
import yaml from "js-yaml";
import { Path, QuestionFile, TopicMeta } from "../../types";
import getPreviousAndNextQuestion from "./get-prev-and-next-question";
import listDirContents from "./list-dir-contents";
import config from "../config";

const getAvailableQuestionPaths = async (
  startingDir = config.basePath,
  topicPathPrefix = ""
): Promise<Path[]> => {
  const availableQuestions = await listDirContents(startingDir);
  return availableQuestions
    .map((q) => q.replace(path.resolve(startingDir), "").replace(".yaml", ""))
    .filter((q) => q !== "/topic")
    .map((q) => `${topicPathPrefix !== "" && `/${topicPathPrefix}`}${q}`);
};

const addQuestionPathPrefix = (path: Path) => `/question${path}`;

const questionFileLoader = async (topic: string, requestedQuestion: string) => {
  const requestedQuestionPath = `/${requestedQuestion}`;

  const requestedTopicPath = path.join(config.basePath, topic as string);

  const requestedTopicFilePath = path.join(requestedTopicPath, `topic.yaml`);

  const requestedQuestionFilePath = path.join(
    requestedTopicPath,
    `${requestedQuestion}.yaml`
  );

  const availableQuestionPaths = await getAvailableQuestionPaths(
    requestedTopicPath,
    topic
  );

  const { next, previous } = getPreviousAndNextQuestion(
    availableQuestionPaths,
    requestedQuestionPath
  );

  try {
    const topicYamlFile = await fs.readFile(requestedTopicFilePath, "utf-8");

    const { title: topicTitle } = yaml.load(topicYamlFile) as TopicMeta;

    const questionYamlFile = await fs.readFile(
      requestedQuestionFilePath,
      "utf-8"
    );

    const {
      title,
      question,
      hint,
      possible_answers,
      correct_answers,
      explanation,
      tags,
      credit,
    } = yaml.load(questionYamlFile) as QuestionFile;

    return {
      topicTitle,
      title,
      topic,
      requestedQuestion: requestedQuestionPath,
      question,
      hint,
      possible_answers,
      correct_answers,
      explanation,
      tags,
      credit,
      next: next && addQuestionPathPrefix(next),
      previous: previous && addQuestionPathPrefix(previous),
    };
  } catch (e) {
    console.error("questionFileLoader", e);
    return false;
  }
};

export default questionFileLoader;
