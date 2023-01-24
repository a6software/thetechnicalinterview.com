import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import path from "path";
import fs from "fs/promises";
import yaml from "js-yaml";
import { ParsedUrlQuery } from "querystring";
import listDirContents from "../../lib/utils/list-dir-contents";
import Footer from "../../lib/components/Footer";
import getTopics from "../../lib/utils/get-topics";
import { AvailableQuestion, TopicMeta } from "../../types";
import QuestionLink from "../../lib/components/QuestionLink";

const basePath = `${process.cwd()}/questions`;

interface Params extends ParsedUrlQuery {
  requestedTopic: string;
}

interface RequestedTopicProps {
  topicTitle: string;
  availableQuestions: AvailableQuestion[];
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const availableTopics = await getTopics(basePath);

  const topicPaths = availableTopics.map((availableTopic) => ({
    params: {
      requestedTopic: availableTopic.dir,
    },
  }));

  return {
    paths: topicPaths,
    fallback: true, // false or 'blocking'
  };
};

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

export const getStaticProps: GetStaticProps<
  RequestedTopicProps,
  Params
> = async ({ params }) => {
  const requestedTopic = params?.requestedTopic || false;

  if (!requestedTopic) {
    return {
      notFound: true,
    };
  }

  const topicPath = path.join(basePath, requestedTopic);
  const availableQuestionsPaths = await listDirContents(topicPath);
  const availableQuestions = availableQuestionsPaths
    .map((q) => q.replace(path.resolve(basePath), "").replace(".yaml", ""))
    .filter((aq) => !aq.endsWith("topic"));

  try {
    const requestedTopicFilePath = path.join(topicPath, `topic.yaml`);
    const topicYamlFile = await fs.readFile(requestedTopicFilePath, "utf-8");
    const { title: topicTitle } = yaml.load(topicYamlFile) as TopicMeta;

    console.log(`availableQuestionsPaths`, availableQuestionsPaths);

    return {
      props: {
        topicTitle,
        availableQuestions: horribleHack(availableQuestions),
      },
    };
  } catch (e) {
    console.log(e);
    return {
      notFound: true,
    };
  }
};

const RequestedTopic: NextPage<RequestedTopicProps> = ({
  topicTitle,
  availableQuestions,
}) => {
  console.log(`availableQuestions`, availableQuestions);

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
          <div className="text-sm breadcrumbs mb-8">
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>{topicTitle}</li>
            </ul>
          </div>

          <p className="pb-8">
            What do you mean this site looks terrible? How dare you. Back in the
            olden days all sites looked like this.
          </p>

          <ul>
            {availableQuestions.map((question) => {
              return (
                <li key={question.path} className="pb-2">
                  <QuestionLink
                    path={question.path}
                    number={question.number}
                    title={question.title}
                  />
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

export default RequestedTopic;
