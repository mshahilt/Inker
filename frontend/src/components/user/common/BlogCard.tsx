import { CardHeader, CardTitle } from "@/components/ui/card";
import { Blog } from "@/types";
import { formatBlogTimestamp } from "@/utils/formateDate";
import { FC } from "react";

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: FC<BlogCardProps> = ({ blog }) => {
  const contentSnippet =
    blog.content?.slice(0, 500) + (blog.content?.length > 400 ? "..." : "");
  return ( <div className="max-w-[400px] w-full rounded-lg justify-items-stretch">
      <CardHeader className="p-1">
        <CardTitle className="text-xl font-semibold text-foreground line-clamp-2">
          {blog.title || "Untitled Blog"}
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          By {blog.authorName || "Unknown Author"} |{" "}
          {blog.createdAt ? formatBlogTimestamp(blog?.createdAt) : "Date Unknown"}
        </p>
      </CardHeader>

      <div
        className="flex max-w-[400px] w-full overflow-y-auto  gap-2 mt-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {blog.tags.map((tag: string, index: number) => (
          <span
            key={index}
            className="px-2 py-[1px] scale-95 text-xs border dark:border-gray-700 rounded-md text-gray-400  hover:cursor-pointer"
          >
            #{tag}
          </span>
        ))}
      </div>

      {blog.thumbnail ? (
        <div className="mt-2">
          <img
            src={blog.thumbnail}
            alt={blog.title}
            className="w-full h-48 object-cover rounded-md hover:cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
          />
        </div>
      ) : (
        <div className="mt-2 h-48 p-3 rounded-md">
          <p className="text-sm text-foreground/80 line-clamp-7">
            {contentSnippet || "No content available"}
          </p>
        </div>
      )}
    </div>
  );
};

export default BlogCard;
