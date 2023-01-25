import Link from "next/link";

type Breadcrumb = { title: string; path: string | null };

type BreadcrumbsProps = {
  showHomeLink: boolean;
  crumbs: Breadcrumb[];
};

const defaults: BreadcrumbsProps = {
  showHomeLink: true,
  crumbs: [],
};

const Breadcrumbs = ({ showHomeLink, crumbs }: BreadcrumbsProps = defaults) => {
  return (
    <div className="text-sm breadcrumbs mb-8">
      <ul>
        {showHomeLink && (
          <li>
            <Breadcrumb crumb={{ path: "/", title: "Home" }} />
          </li>
        )}
        {crumbs.map((crumb) => (
          <li className="sm-w-max">
            <Breadcrumb crumb={crumb} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const Breadcrumb = ({ crumb }: { crumb: Breadcrumb }) => {
  if (crumb.path === null) {
    return <>{crumb.title}</>;
  }

  return (
    <Link href={crumb.path} title={crumb.title}>
      {crumb.title}
    </Link>
  );
};

export default Breadcrumbs;
