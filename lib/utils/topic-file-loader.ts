import path from "path";
import listDirContents from "./list-dir-contents";
import fs from "fs/promises";
import yaml from "js-yaml";
import { TopicMeta } from "../../types";
import config from "../config";

/**
 * GET RID.
 *
 * @param availableQuestions
 */
const horribleHack = (availableQuestions: string[]) =>
  availableQuestions.map((availableQuestion) => {
    const [number, ...title] = availableQuestion
      .split("/")
      .filter((x) => x)[1]
      .split("-");

    return {
      path: availableQuestion,
      number,
      title: title.join(" "),
    };
  });

const topicFileLoader = async (requestedTopic: string) => {
  const topicPath = path.join(config.basePath, requestedTopic);

  const availableQuestionsPaths = await listDirContents(topicPath);

  const availableQuestions = availableQuestionsPaths
    .map((q) =>
      q.replace(path.resolve(config.basePath), "").replace(".yaml", "")
    )
    .filter((availableQuestion) => !availableQuestion.endsWith("topic"));

  try {
    const requestedTopicFilePath = path.join(topicPath, `topic.yaml`);

    const topicYamlFile = await fs.readFile(requestedTopicFilePath, "utf-8");

    const { title: topicTitle } = yaml.load(topicYamlFile) as TopicMeta;

    // console.log(`availableQuestionsPaths`, availableQuestionsPaths);

    return {
      topicTitle,
      availableQuestions: horribleHack(availableQuestions),
    };
  } catch (e) {
    console.error("topicFileLoader", e);
    return false;
  }
};

export default topicFileLoader;
