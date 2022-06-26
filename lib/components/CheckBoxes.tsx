import Markdown from "./Markdown";
import { PossibleAnswer } from "../../types";

type CheckBoxesProps = {
  possibleAnswers: PossibleAnswer[];
};

const CheckBoxes = ({ possibleAnswers }: CheckBoxesProps) => {
  return (
    <>
      {possibleAnswers.map((possibleAnswer) => {
        const key = `answer-${possibleAnswer}`;
        return (
          <div key={key} className="form-control">
            <label className="label cursor-pointer justify-start">
              <input
                type="checkbox"
                className="checkbox"
                name={key}
                value={possibleAnswer}
              />
              <span className="label-text my-3 ml-4">
                <Markdown>{possibleAnswer}</Markdown>
              </span>
            </label>
          </div>
        );
      })}
    </>
  );
};

export default CheckBoxes;
