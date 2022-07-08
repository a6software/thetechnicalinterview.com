import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import listDirContents from "../lib/utils/list-dir-contents";
import Link from "next/link";
import path from "path";

export const getStaticProps: GetStaticProps = async () => {
  const basePath = `${__dirname}/../../../lib/question`;

  const availableQuestionsPaths = await listDirContents(basePath);
  const availableQuestions = availableQuestionsPaths.map((q) =>
    q.replace(path.resolve(basePath), "").replace(".yaml", "")
  );

  return {
    props: {
      availableQuestions,
    },
  };
};

type IndexProps = {
  availableQuestions: string[];
};

const Index: NextPage<IndexProps> = ({ availableQuestions }) => {
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

        <div className="mt-8">
          <ul>
            <li>
              <a
                href="https://github.com/a6software/thetechnicalinterview.com"
                target="_blank"
                rel="noreferrer"
                title={"GitHub"}
                className="link"
              >
                GitHub repo
              </a>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Index;
