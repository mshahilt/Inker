"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { prism } from "react-syntax-highlighter/dist/esm/styles/prism"; 

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const markdownComponents = {
    h1: ({ children }: { children: React.ReactNode }) => (
      <h1 className="text-3xl font-bold text-foreground mb-4">{children}</h1>
    ),
    h2: ({ children }: { children: React.ReactNode }) => (
      <h2 className="text-2xl font-semibold text-foreground mb-3">{children}</h2>
    ),
    h3: ({ children }: { children: React.ReactNode }) => (
      <h3 className="text-xl font-medium text-foreground mb-2">{children}</h3>
    ),
    p: ({ children }: { children: React.ReactNode }) => (
      <p className="text-muted-foreground mb-4 leading-relaxed">{children}</p>
    ),
    ul: ({ children }: { children: React.ReactNode }) => (
      <ul className="list-disc list-inside text-muted-foreground mb-4">{children}</ul>
    ),
    ol: ({ children }: { children: React.ReactNode }) => (
      <ol className="list-decimal list-inside text-muted-foreground mb-4">{children}</ol>
    ),
    a: ({ href, children }: { href?: string; children: React.ReactNode }) => (
      <a href={href} className="text-primary hover:underline">{children}</a>
    ),
    strong: ({ children }: { children: React.ReactNode }) => (
      <strong className="font-bold text-foreground">{children}</strong>
    ),
    em: ({ children }: { children: React.ReactNode }) => (
      <em className="italic text-muted-foreground">{children}</em>
    ),
    code: ({
      inline,
      className,
      children,
    }: {
      inline?: boolean;
      className?: string;
      children: React.ReactNode;
    }) => {
      const match = /language-(\w+)/.exec(className || "");
      return !inline ? (
        <div className="p-4 rounded-lg">
          <SyntaxHighlighter
            style={prism} // Always use prism
            language={match?.[1] || "plaintext"}
            PreTag="div"
          >
            {String(children).trim()}
          </SyntaxHighlighter>
        </div>
      ) : (
        <code className="bg-muted px-1 py-0.5 rounded text-sm font-mono text-primary">{children}</code>
      );
    },
  };

  return (
    <div className="prose prose-invert dark:prose-dark max-w-none">
      <ReactMarkdown components={markdownComponents}>{content}</ReactMarkdown>
    </div>
  );
};
