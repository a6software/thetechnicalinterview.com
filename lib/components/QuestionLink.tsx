import Link from "next/link";

type QuestionLinkProps = {
  path: string;
  number: string;
  title: string;
};

const QuestionLink = ({ path, number, title }: QuestionLinkProps) => {
  return (
    <Link href={`/question${path}`} className="link hover:bg-base-100">
      <span className="no-underline text-sm mr-2 text-neutral">{number}</span>
      <>{title}</>
    </Link>
  );
};

export default QuestionLink;
