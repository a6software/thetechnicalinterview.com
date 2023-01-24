// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import yaml from "js-yaml";
import { QuestionFile } from "../../types";
import path from "path";

type Data = {
  data: { correct: boolean };
};

const basePath = `${process.cwd()}/questions`;

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
    fs.readFileSync(
      path.join(basePath, body.topic, `${body.requestedQuestion}.yaml`),
      "utf8"
    )
  ) as QuestionFile;

  const correct =
    body.answers.length > 0 &&
    correct_answers.every((e) => body.answers.includes(e));

  // Found the name.
  // Sends a HTTP success code
  res.status(200).json({ data: { correct } });
}
