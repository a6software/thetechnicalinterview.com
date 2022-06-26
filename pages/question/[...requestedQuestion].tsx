import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import yaml from "js-yaml";
import fs from "fs/promises";
import Markdown from "../../lib/components/Markdown";
import RadioButtons from "../../lib/components/RadioButtons";
import CheckBoxes from "../../lib/components/CheckBoxes";
import CorrectAnswer from "../../lib/components/CorrectAnswer";
import IncorrectAnswer from "../../lib/components/IncorrectAnswer";
import { QuestionFile } from "../../types";
import listDirContents from "../../lib/utils/list-dir-contents";
import path from "path";
import Link from "next/link";

const basePath = `${__dirname}/../../../../lib/question`;

export const getStaticPaths: GetStaticPaths = async () => {
  const availableQuestions = await listDirContents(basePath);
  const paths = availableQuestions
    .map((q) => q.replace(path.resolve(basePath), "").replace(".yaml", ""))
    .map((q) => ({
      params: {
        requestedQuestion: [`/question${q}`],
      },
    }));

  return {
    paths,
    fallback: true, // false or 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const requestedQuestion = params?.requestedQuestion || false;

  const requestedQuestionPath = (
    Array.isArray(requestedQuestion) ? requestedQuestion : [requestedQuestion]
  ).join("/");

  const requestedQuestionFilePath = `${basePath}/${requestedQuestionPath}.yaml`;

  // Get document, or throw exception on error
  try {
    const yamlFile = await fs.readFile(requestedQuestionFilePath, "utf-8");

    const {
      question,
      hint,
      possible_answers,
      correct_answers,
      explanation,
      tags,
      credit,
    } = yaml.load(yamlFile) as QuestionFile;

    return {
      props: {
        requestedQuestion: requestedQuestionPath,
        question,
        hint,
        possible_answers,
        correct_answers,
        explanation,
        tags,
        credit,
      },
    };
  } catch (e) {
    console.log(e);
    return {
      notFound: true,
    };
  }
};

type AnswerResponse = {
  data: { correct: boolean };
};

type QuestionPageProps = QuestionFile & { requestedQuestion: string };

const QuestionPage: NextPage<QuestionPageProps> = ({
  requestedQuestion,
  question,
  hint,
  possible_answers,
  correct_answers,
  explanation,
  tags,
  credit,
}) => {
  console.log(`requestedQuestion`, requestedQuestion);
  const [result, setResult] = useState<AnswerResponse["data"] | undefined>(
    undefined
  );

  if (!question) {
    return null;
  }

  // Handles the submit event on form submit.
  const handleSubmit = async (event: {
    target: any;
    preventDefault: () => void;
    currentTarget: HTMLFormElement | undefined;
  }) => {
    console.log(`event`, event.target);
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = { requestedQuestion, answers: [] };
    // TODO fix if keeping
    // @ts-ignore
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
      // TODO fix if keeping
      // @ts-ignore
      payload.answers.push(value);
    }

    // Send the data to the server in JSON format.

    // API endpoint where we send form data.
    const endpoint = "/api/answer";

    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: "POST",
      // Tell the server we're sending JSON.
      headers: {
        "Content-Type": "application/json",
      },
      // Body of the request is the JSON data we created above.
      body: JSON.stringify(payload),
    };

    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options);

    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json();
    console.log(`result`, result);
    setResult(result.data);
  };

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

      <main className="container p-4 lg:mx-auto w-full lg:w-1/2">
        <div className="flex flex-col justify-center">
          <div className="text-sm breadcrumbs mb-8">
            <ul>
              <li>
                <Link href="/">
                  <a>Home</a>
                </Link>
              </li>
              <li>{requestedQuestion}</li>
            </ul>
          </div>

          <section>
            <Markdown className={"prose"}>{question}</Markdown>

            <form onSubmit={handleSubmit}>
              {correct_answers.length === 1 ? (
                <RadioButtons possibleAnswers={possible_answers} />
              ) : (
                <CheckBoxes possibleAnswers={possible_answers} />
              )}

              <div className="mt-4 mb-8">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </section>

          <div className="">
            {result && (
              <>
                <section>
                  {result.correct && <CorrectAnswer />}
                  {!result.correct && <IncorrectAnswer />}

                  <Markdown className="prose mt-8">{explanation}</Markdown>
                </section>

                <section className="prose mt-8">
                  <h3>Credit</h3>
                  <p>
                    <a
                      href={credit}
                      target="_blank"
                      rel="noreferrer"
                      title={`This question was originally found at: ${credit}`}
                    >
                      {credit}
                    </a>{" "}
                  </p>

                  <h3>Tags</h3>
                  <ul>
                    {tags.map((tag) => {
                      return <li key={tag}>{tag}</li>;
                    })}
                  </ul>
                </section>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuestionPage;
