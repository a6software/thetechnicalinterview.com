import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import Markdown from "../../../lib/components/Markdown";
import RadioButtons from "../../../lib/components/RadioButtons";
import CheckBoxes from "../../../lib/components/CheckBoxes";
import CorrectAnswer from "../../../lib/components/CorrectAnswer";
import IncorrectAnswer from "../../../lib/components/IncorrectAnswer";
import Credit from "../../../lib/components/Credit";
import {
  GetPreviousAndNextQuestionResponse,
  QuestionFile,
} from "../../../types";
import Link from "next/link";
import classNames from "classnames";
import topic from "../../../lib/utils/topic";
import { ParsedUrlQuery } from "querystring";
import questionFileLoader from "../../../lib/utils/question-file-loader";

const basePath = `${process.cwd()}/questions`;

interface Params extends ParsedUrlQuery {
  topic: string;
  requestedQuestion: string;
}

interface RequestedQuestionProps {}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const questionTopics = await topic(basePath);
  const paths = questionTopics.flatMap((questionTopic) =>
    questionTopic.questions.map((q) => ({
      params: {
        topic: questionTopic.directory,
        requestedQuestion: q.replace(".yaml", ""),
      },
    }))
  );

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  RequestedQuestionProps,
  Params
> = async ({ params }) => {
  const topic = params?.topic || false;
  const requestedQuestion = params?.requestedQuestion || false;

  if (!topic || !requestedQuestion) {
    return {
      notFound: true,
    };
  }

  const questionFileContents = await questionFileLoader(
    topic,
    requestedQuestion
  );

  if (!questionFileContents) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ...questionFileContents,
    },
  };
};

type AnswerResponse = {
  data: { correct: boolean };
};

type QuestionPageProps = QuestionFile &
  GetPreviousAndNextQuestionResponse & {
    requestedQuestion: string;
    topic: string;
    topicTitle: string;
  };

const executeScroll = (ref: MutableRefObject<any>) => {
  ref.current.scrollIntoView({
    behavior: "smooth",
    block: "end",
  });
};

const QuestionPage: NextPage<QuestionPageProps> = ({
  topicTitle,
  title,
  topic,
  requestedQuestion,
  question,
  hint,
  possible_answers,
  correct_answers,
  explanation,
  tags,
  credit,
  next,
  previous,
}) => {
  const [result, setResult] = useState<AnswerResponse["data"] | undefined>(
    undefined
  );

  const answerRef = useRef(null);

  useEffect(() => {
    if (result) {
      executeScroll(answerRef);
    }
  }, [result]);

  if (!question) {
    return null;
  }

  // Handles the submit event on form submit.
  const handleSubmit = async (event: {
    target: any;
    preventDefault: () => void;
    currentTarget: HTMLFormElement | undefined;
  }) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = { topic, requestedQuestion, answers: [] };
    // TODO fix if keeping
    // @ts-ignore
    for (let [key, value] of formData.entries()) {
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
    setResult(result.data);
  };

  const answerBlockClasses = classNames({
    hidden: !result,
  });

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
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href={`/topic/${topic}`}>{topicTitle}</Link>
              </li>
              <li>{title}</li>
            </ul>
          </div>

          <section>
            <div className="prose mb-6">
              <h1 className="">{title}</h1>
            </div>
            <Markdown className={"prose"}>{question}</Markdown>

            <form onSubmit={handleSubmit}>
              {correct_answers.length === 1 ? (
                <RadioButtons
                  possibleAnswers={possible_answers}
                  correctAnswers={correct_answers}
                  highlightCorrectAnswers={typeof result !== "undefined"}
                />
              ) : (
                <CheckBoxes
                  possibleAnswers={possible_answers}
                  correctAnswers={correct_answers}
                  highlightCorrectAnswers={typeof result !== "undefined"}
                />
              )}

              <div className="mt-4 mb-8">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </section>

          <div className={answerBlockClasses} ref={answerRef}>
            <section>
              {result?.correct && <CorrectAnswer />}
              {!result?.correct && <IncorrectAnswer />}

              <Markdown className="prose mt-8">{explanation}</Markdown>
            </section>

            <section className="prose mt-8">
              {credit.length > 0 && (
                <>
                  <h3>Credit</h3>
                  <ul>
                    {credit.map((c) => {
                      return (
                        <li key={c}>
                          <Credit credit={c} />
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}

              <h3>Tags</h3>
              <ul>
                {tags.map((tag) => {
                  return <li key={tag}>{tag}</li>;
                })}
              </ul>
            </section>

            <div className="flex mt-16 w-full">
              <div className="w-1/2 flex justify-start">
                {previous && (
                  <Link
                    href={previous}
                    className="btn btn-secondary"
                    onClick={() => setResult(undefined)}
                  >
                    Previous
                  </Link>
                )}
              </div>
              <div className="w-1/2 flex justify-end">
                {next && (
                  <Link
                    href={next}
                    className="btn btn-secondary"
                    onClick={() => setResult(undefined)}
                  >
                    Next
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuestionPage;
