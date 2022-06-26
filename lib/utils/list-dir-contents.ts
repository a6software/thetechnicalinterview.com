import fs from "fs/promises";
import path from "path";

// https://gist.github.com/kethinov/6658166?permalink_comment_id=3379782#gistcomment-3379782
async function listDirContents(directory: string) {
  let fileList: string[] = [];

  const files = await fs.readdir(directory);

  for (const file of files) {
    const p = path.join(directory, file);

    if ((await fs.stat(p)).isDirectory()) {
      fileList = [...fileList, ...(await listDirContents(p))];
    } else {
      fileList.push(p);
    }
  }

  return fileList;
}

export default listDirContents;
