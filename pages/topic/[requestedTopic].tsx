import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
import Footer from "../../lib/components/Footer";
import getTopics from "../../lib/utils/get-topics";
import { AvailableQuestion } from "../../types";
import QuestionLink from "../../lib/components/QuestionLink";
import config from "../../lib/config";
import topicFileLoader from "../../lib/utils/topic-file-loader";

interface Params extends ParsedUrlQuery {
  requestedTopic: string;
}

interface RequestedTopicProps {
  topicTitle: string;
  introduction: string;
  availableQuestions: AvailableQuestion[];
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const availableTopics = await getTopics(config.basePath);

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

  const topicFileContents = await topicFileLoader(requestedTopic);

  if (!topicFileContents) {
    return {
      notFound: true,
    };
  }

  const { topicTitle, introduction, availableQuestions } = topicFileContents;

  return {
    props: {
      topicTitle,
      introduction,
      availableQuestions,
    },
  };
};

const RequestedTopic: NextPage<RequestedTopicProps> = ({
  topicTitle,
  introduction,
  availableQuestions,
}) => {
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

          <div className="pb-8 prose">
            {introduction.split("\n").map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

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
