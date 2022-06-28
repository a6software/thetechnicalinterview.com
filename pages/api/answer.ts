// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import yaml from "js-yaml";
import { QuestionFile } from "../../types";

type Data = {
  data: { correct: boolean };
};

const basePath = `${__dirname}/../../../../lib/question`;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Get data submitted in request's body.
  const body = req.body;

  // Optional logging to see the responses
  // in the command line where next.js app is running.
  // console.log("body: ", body);

  const { correct_answers } = yaml.load(
    fs.readFileSync(`${basePath}/${body.requestedQuestion}.yaml`, "utf8")
  ) as QuestionFile;

  const correct =
    body.answers.length > 0 &&
    correct_answers.every((e) => body.answers.includes(e));

  // Found the name.
  // Sends a HTTP success code
  res.status(200).json({ data: { correct } });
}
