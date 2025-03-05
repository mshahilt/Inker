import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { MarkdownRenderer } from "./MarkdownRenderer";

export const BlogList: React.FC = () => {
  const blogs = useSelector((state: RootState) => state.blogEditor.blogs);

  return (
    <div className="space-y-6">
      {blogs.length === 0 ? (
        <p className="text-gray-400 text-center">No blogs posted yet.</p>
      ) : (
        blogs.map((blog, index) => (
          <div key={index} className="rounded-lg p-6 space-y-4">
            {blog.thumbnail && (
              <img
                src={URL.createObjectURL(blog.thumbnail)}
                alt={`${blog.title} thumbnail`}
                className="w-full max-h-60 object-cover rounded-md"
              />
            )}
            <h2 className="text-2xl font-bold text-white">{blog.title}</h2>
            <MarkdownRenderer content={blog.content} />
            {blog.attachments.length > 0 && (
              <div className="flex flex-wrap gap-4">
                {blog.attachments.map((file, i) => (
                  <img
                    key={i}
                    src={URL.createObjectURL(file)}
                    alt={`Attachment ${i + 1}`}
                    className="h-24 w-24 object-cover rounded-md"
                  />
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};