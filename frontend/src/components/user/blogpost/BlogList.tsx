import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import MDEditor from "@uiw/react-md-editor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { editBlog } from "@/store/slices/blogSlice";

export const BlogList: React.FC = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state: RootState) => state.blogEditor.blogs);

  return (
    <div className="space-y-6">
      {blogs.length === 0 ? (
        <p className="text-muted-foreground text-center">No blogs posted yet.</p>
      ) : (
        blogs.map((blog) => (
          <Card key={blog._id} className="border rounded-lg">
            {blog.thumbnail?.url && (
              <img
                src={blog.thumbnail.url}
                alt={`${blog.title} thumbnail`}
                className="w-full max-h-60 object-cover rounded-t-lg"
              />
            )}
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-foreground">{blog.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <MDEditor.Markdown source={blog.content} className="bg-background text-foreground" />
              {blog.attachments.length > 0 && (
                <>
                  <Separator className="my-4" />
                  <div className="flex flex-wrap gap-2">
                    {blog.attachmentUrls.map((url, i) => (
                      <img key={i} src={url} alt={`Attachment ${i + 1}`} className="h-20 w-20 object-cover rounded-md border border-border" />
                    ))}
                  </div>
                </>
              )}
              <Button
                onClick={() => dispatch(editBlog(blog))}
                className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md"
              >
                Edit
              </Button>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};