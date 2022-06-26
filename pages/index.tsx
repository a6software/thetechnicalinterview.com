import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import listDirContents from "../lib/utils/list-dir-contents";
import Link from "next/link";
import path from "path";

export const getServerSideProps: GetServerSideProps = async () => {
  const basePath = `${__dirname}/../../../lib/questions`;

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
  console.log(`availableQuestions`, availableQuestions);
  return (
    <div className="primary-content" data-theme={"light"}>
      <Head>
        <title>TheTechnicalInterview.com</title>
        <meta name="description" content="The technical interview" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto bg-gray-50 h-screen w-1/2">
        <div className="flex flex-col justify-center">
          <ul>
            {availableQuestions.map((question) => {
              return (
                <li key={question} className="pb-2">
                  <Link href={`/question/${question}`}>
                    <a className="link">{question}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Index;
