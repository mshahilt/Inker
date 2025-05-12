import { useVote } from "@/hooks/useVote.tsx";
import { ArrowBigDown, ArrowBigUp, Bookmark, MessageCircle  } from "lucide-react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface ViewBlogActionBarProps {
    blogId: string;
    comments: number;
    upVotes: number;
    downVotes: number;
    hasDownVoted: boolean;
    hasUpVoted: boolean;
}

const ViewBlogActionBar: FC<ViewBlogActionBarProps> = ({
    blogId,
    upVotes,
    downVotes,
    hasDownVoted,
    hasUpVoted,
}) => {
    const navigate = useNavigate();

    const {
        localUpVotes,
        localHasUpVoted,
        localHasDownVoted,
        handleUpVote,
        handleDownVote,
    } = useVote(blogId, hasUpVoted, hasDownVoted, upVotes, downVotes);

    const handleCommentClick = () => {
        // Navigate to the blog page with a query parameter to trigger scrolling
        navigate(`/blog/${blogId}?scrollToComments=true`);
    };

    return (
        <div
            className={"border-t justify-between mt-2 bg-white dark:bg-black flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-3 py-2 px-2 sm:px-4 overflow-x-auto sm:overflow-visible"}
        >
            <div
                className="flex items-center justify-center gap-1 p-1 text-xs sm:text-sm border px-2 rounded-md hover:bg-muted cursor-pointer">
                <Bookmark className="w-3 h-3 sm:w-[17px] sm:h-[17px] cursor-pointer" strokeWidth={1} />
            </div>

            <div
                className="flex items-center justify-center gap-1 p-1 text-xs sm:text-sm border px-2 rounded-md hover:bg-muted cursor-pointer" 
                onClick={handleCommentClick}
            >
                {/* <span className=" xs:inline">{comments}</span> */}
                <MessageCircle className="w-3 h-3 sm:w-[17px] sm:h-[17px] cursor-pointer" strokeWidth={1} />
                
            </div>

            <div
                className="flex items-center gap-2 justify-center rounded border h-[20px] sm:h-[25px]  px-2 text-xs sm:text-sm cursor-pointer"
                onClick={handleDownVote}>
                <ArrowBigDown
                    size={17}
                    strokeWidth={1}
                    color={localHasDownVoted ? "#FFAA01" : "#464545"}
                    fill={localHasDownVoted ? "#FFAA01" : "none"}
                />

            </div>

            <div
                className="flex items-center gap-2 justify-center rounded border px-2 text-xs sm:text-sm cursor-pointer"
                onClick={handleUpVote}>
                {localUpVotes}
                <div className="h-[20px] sm:h-[25px] bg-muted-foreground/30 w-[1.5px]" />
                <ArrowBigUp
                    size={17}
                    strokeWidth={1}
                    color={localHasUpVoted ? "#FFAA01" : "#464545"}
                    fill={localHasUpVoted ? "#FFAA01" : "none"}
                />
            </div>
        </div>
    );
};

export default ViewBlogActionBar;
