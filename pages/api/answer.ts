import fs from "fs";
import yaml from "js-yaml";

export default function handler(req, res) {
  // Get data submitted in request's body.
  const body = req.body;

  // Optional logging to see the responses
  // in the command line where next.js app is running.
  console.log("body: ", body);

  // try {
  const { correct_answers } = yaml.load(
    fs.readFileSync(
      // `${__dirname}/../../../../lib/questions/javascript/0000001-lost-in-parameters.yaml`,
      `${__dirname}/../../../../lib/questions/javascript/0000002-closures-raise-your-hand.yaml`,
      "utf8"
    )
  );

  console.log(`correct_answers`, correct_answers);

  const correct =
    body.answers.length > 0 &&
    correct_answers.every((e) => body.answers.includes(e));

  // Found the name.
  // Sends a HTTP success code
  res.status(200).json({ data: { correct } });
}
