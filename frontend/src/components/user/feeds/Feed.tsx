import { Link } from "react-router-dom";
import BlogCard from "../common/BlogCard";
import {
  FaChevronRight,
  FaChevronLeft,
} from "react-icons/fa";
import char from "../../../assets/char3.jpeg";
import { ArrowBigDown, ArrowBigUp, Clipboard, EllipsisVertical, MessageCircle, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, getBlogs } from "@/store/slices/blogSlice";
import { AppDispatch, RootState } from "@/store/store";


const Feeds = () => {
  const { blogs } = useSelector((state: RootState) => state.blogEditor);
  const { username, id } = useSelector((state: RootState) => state.auth.user)
  const dispatch = useDispatch<AppDispatch>()
   
  useEffect(() => {
      dispatch(getBlogs());
    }, [dispatch]);

    const handleDelete = (blogId: string) => {
      dispatch(deleteBlog({ blogId, authorId: id }));
    };
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Filter box</h1>
      {blogs.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog, index) => (
              <article
                key={index}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col h-full relative p-2"
              >
                <button>
                  <EllipsisVertical className="rounded-xl hover:cursor-pointer absolute right-1 top-3" />
                </button>

                <div className="flex w-full items-center">
                  <img
                    src={char}
                    alt="Profile"
                    className="w-10 h-10 rounded-full mr-3 object-cover"
                  />
                  <span className="font-medium">{username}</span>
                </div>

                <Link
                  to={`/blog/${blog._id}`}
                  className="flex-grow"
                  aria-label={`Read post ${blog.title || "Untitled"}`}
                >
                  <div className="p-1">
                    <BlogCard blog={blog} />
                  </div>
                </Link>
                <div className="flex gap-2 justify-around mt-5  text-gray-600 dark:text-gray-400 ">
                  <div
                    className="flex items-center justify-center px-2 bg-gray-100 dark:bg-gray-800 w-fit rounded-md "
                    onClick={() => handleDelete(blog._id)}
                  >
                    <Trash2 size={17} strokeWidth={1} />
                  </div>
                  <div
                      className="flex items-center justify-center px-2 bg-gray-100 dark:bg-gray-800 w-fit rounded-md"
                    >
                      <Clipboard size={17} strokeWidth={1}/>
                    </div>
                  <div className="flex items-center justify-center px-2 bg-gray-100 dark:bg-gray-800 w-fit rounded-md ">
                    {blog.comments}
                    <MessageCircle size={19} strokeWidth={1} />
                  </div>
                  <div className="flex items-center justify-center px-2 bg-gray-100 dark:bg-gray-800 w-fit rounded-md ">
                    <button className="flex items-center gap-1 text-sm  hover:cursor-pointer">
                      <ArrowBigUp strokeWidth={1} />
                    </button>
                    {blog?.likes}
                    <button className="flex items-center gap-1 text-sm  hover:cursor-pointer">
                      <ArrowBigDown strokeWidth={1} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination UI */}
          <nav className="flex justify-center mt-10" aria-label="Pagination">
            <ul className="flex items-center space-x-1">
              {/* Previous Button */}
              <li>
                <button className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-400">
                  <FaChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </button>
              </li>

              {/* Page Numbers */}
              <li>
                <button className="px-4 py-2 rounded-md text-sm font-medium border">
                  1
                </button>
              </li>
              <li>
                <button className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
                  2
                </button>
              </li>
              <li>
                <button className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
                  3
                </button>
              </li>

              {/* Ellipsis */}
              <li>
                <span className="px-2 py-2 text-gray-500 dark:text-gray-400">
                  ...
                </span>
              </li>

              {/* Next Button */}
              <li>
                <button className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300">
                  Next
                  <FaChevronRight className="ml-2 h-4 w-4" />
                </button>
              </li>
            </ul>
          </nav>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <svg
            className="w-16 h-16 text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
            />
          </svg>
          <p className="text-xl font-medium text-gray-600 dark:text-gray-300">
            No posts available yet
          </p>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Check back later for new content
          </p>
        </div>
      )}
    </section>
  );
};

export default Feeds;
