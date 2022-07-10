import path from "path";
import topic from "./topic";

const fakeFsExamplePath = path.join(
  __dirname,
  "../../__test__/fake-fs-example"
);

describe("lib/utils/topic", () => {
  test("returns the expected topic listings", async () => {
    expect(await topic(path.join(fakeFsExamplePath))).toEqual([
      {
        directory: "dir1",
        questions: ["q-1.yaml", "q-2.yaml"],
      },
      {
        directory: "dir2",
        questions: ["q-1.yaml", "q-2.yaml", "q-3.yaml"],
      },
      {
        directory: "dir3",
        questions: ["q-1.yaml"],
      },
    ]);
  });
});
