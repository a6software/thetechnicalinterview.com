import Markdown from "./Markdown";
import { useState } from "react";

type HintProps = {
  hint: string;
};

const Hint = ({ hint }: HintProps) => {
  const [isShowing, toggleShowing] = useState<boolean>(false);

  const showHideHintText = `${isShowing ? "Hide" : "Show"} hint`;

  return (
    <div className="collapse">
      <input type="checkbox" onClick={() => toggleShowing(!isShowing)} />
      <div className="collapse-title p-0 pt-2">{showHideHintText}</div>
      <div className="collapse-content">
        <Markdown className={"prose"}>{hint}</Markdown>
      </div>
    </div>
  );
};

export default Hint;
