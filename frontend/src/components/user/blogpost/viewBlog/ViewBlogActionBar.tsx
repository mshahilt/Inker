import { VoteService } from "@/services/voteServices";
import useAuthStore from "@/store/authStore";
import { useBlogStore } from "@/store/blogStore";
import { showConfirmDialog } from "@/store/slices/confirmDialogSlice";
import { useBlogEditorStore } from "@/store/useBlogEditorStore";
import { ArrowBigDown, ArrowBigUp, ArrowLeft, Clipboard, MessageCircle, Pencil, Trash2 } from "lucide-react";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface ViewBlogActionBarProps {
    blogId: string;
    comments: number;
    upVotes: number;
    downVotes: number;
    authorId: string
}

const ViewBlogActionBar: FC<ViewBlogActionBarProps> = ({ blogId, comments, upVotes, downVotes, authorId }) => {
    const { deleteBlog } = useBlogStore()
    const { setEditingBlog } = useBlogEditorStore()
    const { user } = useAuthStore();

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleUpVote = async () => {
        await VoteService.upVote(blogId)
    }

    const handleDownVote = async () => {
        await VoteService.downVote(blogId)
    }

    const handleDelete = () => {
        deleteBlog(blogId, user?._id as string)
    };




    const handleEditNavigator = async () => {
        const val = await setEditingBlog(blogId)
        if (val) {
            navigate(`/blog/edit`)
        }
    }

    return (
        <div className="sticky top-[75px] md:top-[73px] bg-white dark:bg-black flex flex-wrap sm:flex-nowrap justify-end items-center gap-2 sm:gap-3 border-b py-2 px-2 sm:px-4 overflow-x-auto sm:overflow-visible">

            <div
                onClick={() => navigate(-1)}
                className="text-muted-foreground hover:text-foreground mr-auto "
                aria-label="Back to Blogs"
            >
                <ArrowLeft className="h-3 w-3 sm:h-5 sm:w-5" />
            </div>


            <div
                className="flex items-center justify-center p-1 rounded-md border hover:bg-muted cursor-pointer"
                onClick={() => {
                    navigator.clipboard.writeText(`http://inker-dev.vercel.app/blog/${blogId}`);
                    toast.success("Blog link copied!");
                }}
                title="Copy blog link"
            >
                <Clipboard className="w-3 h-3 sm:w-[17px] sm:h-[17px] cursor-pointer" strokeWidth={1} />
            </div>

            <div className="flex items-center justify-center gap-1 p-1 text-xs sm:text-sm border px-2 rounded-md hover:bg-muted cursor-pointer">
                <span className="hidden xs:inline">{comments}</span>
                <MessageCircle className="w-3 h-3 sm:w-[17px] sm:h-[17px] cursor-pointer" strokeWidth={1} />
            </div>

            <div className="flex items-center gap-2 justify-center rounded border  px-2 text-xs sm:text-sm">
                {downVotes}
                <div className="h-[20px] sm:h-[25px] bg-muted-foreground/30 w-[1.5px]" />
                <ArrowBigDown
                    className="w-4 h-4 sm:w-[17px] sm:h-[17px] cursor-pointer"
                    strokeWidth={1}
                    onClick={handleDownVote}
                />
            </div>

            <div className="flex items-center gap-2 justify-center rounded border px-2 text-xs sm:text-sm">
                {upVotes}
                <div className="h-[20px] sm:h-[25px] bg-muted-foreground/30 w-[1.5px]" />
                <ArrowBigUp
                    className="w-4 h-4 sm:w-[17px] sm:h-[17px] cursor-pointer"
                    strokeWidth={1}
                    onClick={handleUpVote}
                />
            </div>

            {user?._id === authorId && (
                <div className="flex items-center gap-2 justify-center rounded border px-2 text-xs sm:text-sm"
                >

                    <Trash2 className="w-4 h-4 sm:w-[17px] sm:h-[17px] cursor-pointer" strokeWidth={1} onClick={() =>
                        dispatch(
                            showConfirmDialog({
                                title: "Are you sure you want to delete?",
                                description: "You will not be able to recover it.",
                                confirmText: "Delete",
                                cancelText: "Cancel",
                                onConfirm: () => handleDelete(),
                            })
                        )
                    } />

                    <div className="h-[20px] sm:h-[25px] bg-muted-foreground/30 w-[1.5px]" />

                    <Pencil className="w-4 h-4 sm:w-[17px] sm:h-[17px] cursor-pointer" strokeWidth={1} onClick={handleEditNavigator} />

                </div>
            )}
        </div>

    )
}

export default ViewBlogActionBar
