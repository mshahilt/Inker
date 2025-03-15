import type React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { prism } from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdownOptions from "react-markdown";


interface MarkdownRendererProps {
  content: string;
}

interface HeadingProps {
  children: React.ReactNode;
}

interface ParagraphProps {
  children: React.ReactNode;
}

interface ListProps {
  children: React.ReactNode;
}

interface LinkProps {
  href?: string;
  children: React.ReactNode;
}

interface TextProps {
  children: React.ReactNode;
}

interface CodeProps {
  inline?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const markdownComponents: Partial<typeof ReactMarkdownOptions> = {
    h1: ({ children }: HeadingProps) => (
      <h1 className="text-3xl font-bold text-foreground mb-4">{children}</h1>
    ),
    h2: ({ children }: HeadingProps) => (
      <h2 className="text-2xl font-semibold text-foreground mb-3">{children}</h2>
    ),
    h3: ({ children }: HeadingProps) => (
      <h3 className="text-xl font-medium text-foreground mb-2">{children}</h3>
    ),
    p: ({ children }: ParagraphProps) => (
      <p className="text-muted-foreground mb-4 leading-relaxed">{children}</p>
    ),
    ul: ({ children }: ListProps) => (
      <ul className="list-disc list-inside text-muted-foreground mb-4">{children}</ul>
    ),
    ol: ({ children }: ListProps) => (
      <ol className="list-decimal list-inside text-muted-foreground mb-4">{children}</ol>
    ),
    a: ({ href, children }: LinkProps) => (
      <a href={href} className="text-primary hover:underline">
        {children}
      </a>
    ),
    strong: ({ children }: TextProps) => (
      <strong className="font-bold text-foreground">{children}</strong>
    ),
    em: ({ children }: TextProps) => (
      <em className="italic text-muted-foreground">{children}</em>
    ),
    code: ({ inline, className, children }: CodeProps) => {
      const match = /language-(\w+)/.exec(className || "");
      return !inline ? (
        <div className="p-4 rounded-lg">
          <SyntaxHighlighter
            style={prism}
            language={match?.[1] || "plaintext"}
            PreTag="div"
          >
            {String(children).trim()}
          </SyntaxHighlighter>
        </div>
      ) : (
        <code className="bg-muted px-1 py-0.5 rounded text-sm font-mono text-primary">
          {children}
        </code>
      );
    },
  };

  return (
    <div className="prose prose-invert dark:prose-dark max-w-none">
      <ReactMarkdown components={markdownComponents}>{content}</ReactMarkdown>
    </div>
  );
};