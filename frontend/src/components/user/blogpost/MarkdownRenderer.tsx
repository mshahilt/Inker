import React from "react";
import ReactMarkdown from "react-markdown";

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const markdownComponents = {
    h1: ({ children }: { children: React.ReactNode }) => (
      <h1 className="text-3xl font-bold text-white mb-4">{children}</h1>
    ),
    h2: ({ children }: { children: React.ReactNode }) => (
      <h2 className="text-2xl font-semibold text-white mb-3">{children}</h2>
    ),
    h3: ({ children }: { children: React.ReactNode }) => (
      <h3 className="text-xl font-medium text-white mb-2">{children}</h3>
    ),
    p: ({ children }: { children: React.ReactNode }) => (
      <p className="text-gray-200 mb-4 leading-relaxed">{children}</p>
    ),
    ul: ({ children }: { children: React.ReactNode }) => (
      <ul className="list-disc list-inside text-gray-200 mb-4">{children}</ul>
    ),
    ol: ({ children }: { children: React.ReactNode }) => (
      <ol className="list-decimal list-inside text-gray-200 mb-4">{children}</ol>
    ),
    a: ({ href, children }: { href?: string; children: React.ReactNode }) => (
      <a href={href} className="text-purple-400 hover:underline">{children}</a>
    ),
    strong: ({ children }: { children: React.ReactNode }) => (
      <strong className="font-bold text-white">{children}</strong>
    ),
    em: ({ children }: { children: React.ReactNode }) => (
      <em className="italic text-gray-200">{children}</em>
    ),
  };

  return (
    <div className="prose prose-invert max-w-none">
      <ReactMarkdown components={markdownComponents}>{content}</ReactMarkdown>
    </div>
  );
};