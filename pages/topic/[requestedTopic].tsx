import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import path from "path";
import listDirContents from "../../lib/utils/list-dir-contents";
import { GetStaticPaths } from "next";
import Footer from "../../lib/components/Footer";
import getTopics from "../../lib/utils/get-topics";
import { ParsedUrlQuery } from "querystring";
import Link from "next/link";

const basePath = `${__dirname}/../../../../lib/question`;

interface Params extends ParsedUrlQuery {
  requestedTopic: string;
}

interface RequestedTopicProps {
  availableQuestions: string[];
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const availableTopics = await getTopics(basePath);

  const paths = availableTopics.map((availableTopic) => ({
    params: {
      requestedTopic: availableTopic.dir,
    },
  }));

  return {
    paths,
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

  const availableQuestionsPaths = await listDirContents(
    path.join(basePath, requestedTopic)
  );
  const availableQuestions = availableQuestionsPaths
    .map((q) => q.replace(path.resolve(basePath), "").replace(".yaml", ""))
    .filter((aq) => !aq.endsWith("topic"));

  return {
    props: {
      availableQuestions,
    },
  };
};

type IndexProps = {
  availableQuestions: string[];
};

const RequestedTopic: NextPage<RequestedTopicProps> = ({
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
          <p className="pb-8">
            What do you mean this site looks terrible? How dare you. Back in the
            olden days all sites looked like this.
          </p>

          <ul>
            {availableQuestions.map((question) => {
              return (
                <li key={question} className="pb-2">
                  <Link href={`/question${question}`}>
                    <a className="link">{question}</a>
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

export default RequestedTopic;
