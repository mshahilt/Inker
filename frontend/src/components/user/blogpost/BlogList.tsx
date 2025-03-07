import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const BlogList: React.FC = () => {
  const blogs = useSelector((state: RootState) => state.blogEditor.blogs);

  return (
    <div className="space-y-6">
      {blogs.length === 0 ? (
        <p className="text-muted-foreground text-center">No blogs posted yet.</p>
      ) : (
        blogs.map((blog, index) => (
          <Card key={index} className="">
            {blog.thumbnail && (
              <img
                src={URL.createObjectURL(blog.thumbnail)}
                alt={`${blog.title} thumbnail`}
                className="w-full max-h-60 object-cover rounded-t-lg"
              />
            )}
            <CardHeader>
              <CardTitle className="text-4xl font-bold text-foreground">{blog.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <MarkdownRenderer content={blog.content} />
              {blog.attachments.length > 0 && (
                <>
                  <Separator className="my-4" />
                  <div className="flex flex-wrap gap-2">
                    {blog.attachments.map((file, i) => (
                      <img
                        key={i}
                        src={URL.createObjectURL(file)}
                        alt={`Attachment ${i + 1}`}
                        className="h-20 w-20 object-cover rounded-md"
                      />
                    ))}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};
