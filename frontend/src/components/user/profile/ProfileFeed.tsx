import { FC, useCallback, useEffect, useState } from "react";
import BlogCard from "../common/BlogCard";
import { Link, useParams } from "react-router-dom";
import { useSidebar } from "@/components/ui/sidebar";
import { useBlogStore } from "@/store/blogStore";
import Pagination from "@/components/user/common/Pagination";
import Loader from "../common/Loader";
import ViewBlogActionBar from "../blogpost/viewBlog/ViewBlogActionBar";

const TAB_OPTIONS = ["Posts", "Archives", "Saved"] as const;

const ProfileFeed: FC = () => {
  const [activeTab, setActiveTab] = useState<"Posts" | "Archives" | "Saved">(
    "Posts"
  );
  const {
    getBlogsByAuthorName,
    getArchivedBlogs,
    profileFeeds,
    profileArchivedFeeds,
    isLoading,
  } = useBlogStore();
  const { userTag } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const { state } = useSidebar();

  const refreshBlogs = useCallback(() => {
    if (activeTab === "Posts" && userTag) {
      getBlogsByAuthorName(userTag, currentPage);
    } else if (activeTab === "Archives" && userTag) {
      getArchivedBlogs(currentPage);
    }
  }, [getBlogsByAuthorName, getArchivedBlogs, activeTab, userTag, currentPage]);

  useEffect(() => {
    refreshBlogs();
  }, [refreshBlogs]);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderBlogs = () => {
    const blogs =
      activeTab === "Posts"
        ? profileFeeds?.blogs
        : activeTab === "Archives"
          ? profileArchivedFeeds?.archivedBlogs
          : [];

    if (!blogs || blogs.length === 0) {
      return (
        <p className="text-gray-600 text-center text-2xl font-medium  col-span-3 mt-14">
          {activeTab === "Posts"
            ? "No posts available !"
            : activeTab === "Archives"
              ? "No archived posts available !"
              : "No saved blogs available !"}
        </p>
      );
    }

    return blogs.map((blog) => (
      <div
        key={blog._id}
        className="p-2 border-2 rounded-lg max-w-[400px] flex flex-col justify-between relative"
      >
        <Link to={`/blog/${blog._id}`}>
          <BlogCard blog={blog} />
        </Link>

        <ViewBlogActionBar
          blogId={blog?._id}
          comments={blog?.comments}
          upVotes={blog?.upVotes}
          downVotes={blog?.downVotes}
          hasUpVoted={blog?.hasUpVoted}
          hasDownVoted={blog?.hasDownVoted}
          authorId={blog?.authorId}
          isArchived={blog?.isArchived}
          onArchiveChange={refreshBlogs}
        />
      </div>
    ));
  };

  return (
    <div className="my-4 lg:m-0 h-full flex-1 max-w-[1000px] relative lg:border-x">
      <div className="flex gap-4 justify-around border-b text-gray-600 sticky top-[73px] z-20 bg-white dark:bg-black">
        {TAB_OPTIONS.map((tab) => (
          <div className="relative" key={tab}>
            <button
              className={`px-5 py-2 rounded-lg text-md dark:hover:bg-neutral-500/10 hover:bg-gray-200/30 ${activeTab === tab
                ? "font-semibold dark:text-white "
                : "font-medium"
                }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
            {activeTab === tab && (
              <div className="absolute bottom-0 left-1/2 w-12 -translate-x-1/2 border-b-2 dark:border-white border-black"></div>
            )}
          </div>
        ))}
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <Loader className="max-w-[200px]" />
        </div>
      ) : (
        <>
          <div
            className="flex justify-center lg:overflow-y-auto"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div
              className={`grid ${state === "expanded"
                ? "xl:grid-cols-2"
                : "xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2"
                } grid-cols-1 gap-4 h-fit justify-center mt-5 px-4 pb-4 w-full`}
            >
              {renderBlogs()}
            </div>
          </div>

          <Pagination
            onPageChange={onPageChange}
            currentPage={currentPage}
            totalPages={
              activeTab === "Posts"
                ? profileFeeds?.totalPages
                : activeTab === "Archives"
                  ? profileArchivedFeeds?.totalPages
                  : profileFeeds?.totalPages
            }
          />
        </>
      )}
    </div>
  );
};

export default ProfileFeed;
