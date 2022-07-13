import classnames from "classnames";
import Markdown from "./Markdown";
import { PossibleAnswer } from "../../types";

type RadioButtonsProps = {
  possibleAnswers: PossibleAnswer[];
  correctAnswers: PossibleAnswer[];
  highlightCorrectAnswers: boolean;
};

const RadioButtons = ({
  possibleAnswers,
  correctAnswers,
  highlightCorrectAnswers,
}: RadioButtonsProps) => {
  return (
    <>
      {possibleAnswers.map((possibleAnswer) => {
        const classes = classnames("form-control", {
          "bg-success":
            highlightCorrectAnswers && correctAnswers.includes(possibleAnswer),
        });

        const key = `answer`;
        return (
          <div key={possibleAnswer} className={classes}>
            <label className="label cursor-pointer justify-start">
              <input
                type="radio"
                name={key}
                className="radio radio-primary"
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

export default RadioButtons;
