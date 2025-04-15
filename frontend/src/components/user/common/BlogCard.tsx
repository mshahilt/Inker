import { CardHeader, CardTitle } from "@/components/ui/card";
import { Blog } from "@/types";
import { formatBlogTimestamp } from "@/utils/formateDate";
import { FC } from "react";

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: FC<BlogCardProps> = ({ blog }) => {
  const fallbackThumbnail =
    "https://tse1.mm.bing.net/th?id=OIP.kkJ4tBMv2tT9OqxmUWlQFgHaEK&pid=Api&P=0&h=180";

  return (
    <div className="max-w-[400px] w-full rounded-lg justify-items-stretch">
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

      <div className="mt-3">
        <img
          src={blog.thumbnail || fallbackThumbnail}
          alt={blog.title}
          className="w-full h-48 object-cover rounded-md  hover:cursor-pointer"
        />
      </div>
    </div>
  );
};

export default BlogCard;
