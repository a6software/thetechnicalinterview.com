import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import getTopics from "../lib/utils/get-topics";
import fs from "fs/promises";
import yaml from "js-yaml";
import { TopicMeta, TopicPathing } from "../types";
import Footer from "../lib/components/Footer";

const basePath = `${__dirname}/../../../lib/question`;

type TopicListing = {
  dir: TopicPathing["dir"];
  title: TopicMeta["title"];
};

export const getStaticProps: GetStaticProps = async () => {
  const availableTopics = await getTopics(basePath);

  // TODO extract
  const topics: TopicListing[] = await Promise.all(
    availableTopics.map(async (topic) => {
      console.log(`topic.topicFilePath`, topic.topicFilePath);
      const yamlFile = await fs.readFile(topic.topicFilePath, "utf-8");

      const { title } = yaml.load(yamlFile) as TopicMeta;

      return { dir: topic.dir, title };
    })
  );

  console.log(`topics`, topics);

  return {
    props: {
      topics,
    },
  };
};

type IndexProps = {
  topics: TopicListing[];
  availableQuestions: string[];
};

const Index: NextPage<IndexProps> = ({ topics }) => {
  return (
    <div
      className="primary-content bg-gray-50 h-full min-h-screen"
      data-theme={"light"}
    >
      <Head>
        <title>TheTechnicalInterview.com</title>
        <meta name="description" content="The technical interview" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container p-4 lg:mx-auto h-screen w-full lg:w-1/2">
        <div className="flex flex-col justify-center">
          <p className="pb-8">
            What do you mean this site looks terrible? How dare you. Back in the
            olden days all sites looked like this.
          </p>
          <ul>
            {topics.map((topic) => {
              return (
                <li key={topic.dir} className="pb-2">
                  <Link href={`/topic/${topic.dir}`}>
                    <a className="link">{topic.title}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default Index;
