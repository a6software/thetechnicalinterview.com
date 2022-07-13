import Markdown from "./Markdown";
import { PossibleAnswer } from "../../types";
import classnames from "classnames";

type CheckBoxesProps = {
  possibleAnswers: PossibleAnswer[];
  correctAnswers: PossibleAnswer[];
  highlightCorrectAnswers: boolean;
};

const CheckBoxes = ({
  possibleAnswers,
  correctAnswers,
  highlightCorrectAnswers,
}: CheckBoxesProps) => {
  return (
    <>
      {possibleAnswers.map((possibleAnswer) => {
        const classes = classnames("form-control", {
          "bg-success":
            highlightCorrectAnswers && correctAnswers.includes(possibleAnswer),
        });

        const key = `answer-${possibleAnswer}`;
        return (
          <div key={key} className={classes}>
            <label
              className="label cursor-pointer justify-start"
              data-testid="checkbox-label"
            >
              <input
                data-testid="checkbox-input"
                type="checkbox"
                className="checkbox"
                name={key}
                value={possibleAnswer}
              />
              <span
                className="label-text my-3 ml-4"
                data-testid="checkbox-question-text"
              >
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
