import fs from "fs/promises";
import path from "path";

interface Topic {
  directory: string;
  questions: string[];
}

const topic = async (directory: string): Promise<Topic[]> => {
  const topics = await fs.readdir(directory);

  return await Promise.all(
    topics.map(async (topic) => {
      const topicDirectoryPath = path.join(directory, topic);
      const topicDirectoryContents = await fs.readdir(topicDirectoryPath);

      return {
        directory: topic,
        questions: topicDirectoryContents.filter(
          (path) => !path.endsWith("topic.yaml")
        ),
      };
    })
  );
};

export default topic;
