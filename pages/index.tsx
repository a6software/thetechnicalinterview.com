import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Icon } from "@iconify/react";
import getTopics from "../lib/utils/get-topics";
import Footer from "../lib/components/Footer";
import getAvailableTopics from "../lib/utils/get-available-topics";
import { TopicListing } from "../types";

const basePath = `${__dirname}/../../../questions`;

export const getStaticProps: GetStaticProps = async () => {
  const availableTopics = await getTopics(basePath);

  const topics = await getAvailableTopics(availableTopics);

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
                <li key={topic.dir} className="pb-4">
                  <Link
                    href={`/topic/${topic.dir}`}
                    className="link flex items-center gap-2"
                    title={`${topic.title} technical interview questions`}
                  >
                    <div className="w-8 flex justify-center">
                      <Icon icon={topic.icon} />
                    </div>
                    <div>{topic.title}</div>
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
