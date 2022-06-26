import Markdown from "./Markdown";
import { PossibleAnswer } from "../../types";

type RadioButtonsProps = {
  possibleAnswers: PossibleAnswer[];
};

const RadioButtons = ({ possibleAnswers }: RadioButtonsProps) => {
  return (
    <>
      {possibleAnswers.map((possibleAnswer) => {
        const key = `answer`;
        return (
          <div key={possibleAnswer} className="form-control">
            <label className="label cursor-pointer justify-start">
              <input type="radio" name={key} className="radio radio-primary" />
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

export default RadioButtons;
