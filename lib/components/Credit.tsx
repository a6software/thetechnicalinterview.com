import { isValidUrl } from "../utils/is-valid-url";

type CreditProps = {
  credit: string;
};

const Credit = ({ credit }: CreditProps) => {
  if (!isValidUrl(credit)) {
    return <>{credit}</>;
  }

  return (
    <a
      href={credit}
      target="_blank"
      rel="noreferrer"
      title={`This question was originally found at: ${credit}`}
    >
      {credit}
    </a>
  );
};

export default Credit;
