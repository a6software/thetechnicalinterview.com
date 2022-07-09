// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import listDirContents from "../../lib/utils/list-dir-contents";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const questions = await listDirContents(
    `${__dirname}/../../../../lib/question`
  );

  res.status(200).json({ name: "John Doe" });
}
