import { FC, useEffect, useState } from "react";
import BlogCard from "../common/BlogCard";
import { ArrowBigUp, ArrowBigDown, MessageCircle, Pencil, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { deleteBlog, getBlogByAuthorId } from "@/store/slices/blogSlice";
const TAB_OPTIONS = ["Posts", "Archieve", "Saved"] as const;

const ProfileFeed: FC = () => {
  const [activeTab, setActiveTab] = useState<"Posts" | "Archieve" | "Saved">(
    "Posts"
  );

  const { blogs } = useSelector((state: RootState) => state.blogEditor);
  const { id } = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getBlogByAuthorId(id));
  }, [dispatch, id]);

  const handleDelete = (blogId: string) => {
    dispatch(deleteBlog({ blogId, authorId: id }));
  };



  return (
    <div className="mt-4 lg:m-0 lg:border flex-1 max-w-[900px]">
      <div className="flex gap-4 justify-around border-b text-gray-600 sticky top-0 bg-white dark:bg-black">
        {TAB_OPTIONS.map((tab) => (
          <div className="relative">
            <button
              key={tab}
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
      <div className="flex justify-center h-[85vh] lg:overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <div className="grid md:grid-cols-2 grid-cols-1 h-fit justify-center ">
          {blogs.length > 0 ? (
            blogs.map((blog, index) => (
              <div
                key={index}
                className="p-2 m-1 border-2 rounded-lg max-w-[300px] flex flex-col justify-between relative">

                <Link to={`/blog/${blog._id}`}>
                  <BlogCard blog={blog} />
                </Link>

                <div className="flex gap-2 justify-around mt-5  text-gray-600 dark:text-gray-400 ">
                  <div
                    className="flex items-center justify-center px-2 bg-gray-100 dark:bg-gray-800 w-fit rounded-md "
                    onClick={() => handleDelete(blog._id)}
                  >
                    <Trash2 size={17} strokeWidth={1} />
                  </div>
                  <div
                    className="flex items-center justify-center px-2 bg-gray-100 dark:bg-gray-800 w-fit rounded-md "
                    onClick={() => navigate(`/blog/edit/${blog._id}`)}
                  >
                    <Pencil size={17} strokeWidth={1} />
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
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center text-2xl font-medium  col-span-3 mt-14">No posts available !</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileFeed;
