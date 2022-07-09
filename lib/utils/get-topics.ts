import fs from "fs/promises";
import path from "path";
import { Path, TopicPathing } from "../../types";

async function getTopics(topicsPath: Path) {
  let topicPaths: TopicPathing[] = [];

  const directories = await fs.readdir(topicsPath);

  for (const dir of directories) {
    try {
      const topicPath = path.join(topicsPath, dir);
      const topicFilePath = path.join(topicPath, "topic.yaml");
      const hasTopicFile = await fs.stat(topicFilePath);

      if (hasTopicFile) {
        topicPaths.push({
          path: topicPath,
          dir,
          topicFilePath,
        });
      }
    } catch (e) {
      console.warn(e);
    }
  }

  return topicPaths;
}

export default getTopics;
