import fs from "fs/promises";
import yaml from "js-yaml";
import { TopicListing, TopicMeta, TopicPathing } from "../../types";

const getAvailableTopics = (
  availableTopics: TopicPathing[]
): Promise<TopicListing[]> =>
  Promise.all(
    availableTopics.map(async (topic) => {
      const yamlFile = await fs.readFile(topic.topicFilePath, "utf-8");

      const { title } = yaml.load(yamlFile) as TopicMeta;

      return { dir: topic.dir, title };
    })
  );

export default getAvailableTopics;
