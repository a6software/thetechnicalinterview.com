import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import React from "react";

interface MarkdownProps {
  className?: string;
  children: React.ReactNode | React.ReactNode[];
}

const Markdown = ({ children, className = "prose" }: MarkdownProps) => {
  return (
    <ReactMarkdown
      className={className}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              // @ts-ignore - don't understand this error
              style={dracula}
              language={match[1]}
              PreTag="div"
              showLineNumbers
              {...props}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {children?.toString() ?? ""}
    </ReactMarkdown>
  );
};

export default Markdown;
