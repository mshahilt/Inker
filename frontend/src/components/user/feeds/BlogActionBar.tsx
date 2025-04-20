import { ArrowBigDown, ArrowBigUp, MessageCircle } from "lucide-react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface BlogActionBarProps {
    blogId: string;
    comments: number;
    upVotes: number;
    downVotes: number
}

const BlogActionBar: FC<BlogActionBarProps> = ({ blogId, comments, upVotes, downVotes }) => {
    const navigate = useNavigate()
    return (
        <div
            className="flex gap-2 justify-around mt-5 max-h-12 text-muted-foreground border-t py-2"
            onClick={() => navigate(`/blog/${blogId}`)}>

            <div
                className="flex items-center justify-center gap-1 p-2 w-fit cursor-pointer text-sm  border px-2 rounded-md">
                {comments}
                <MessageCircle size={19} strokeWidth={1} />
            </div>

            <div className="flex items-center gap-2 justify-center  w-fit rounded border border-muted px-2">
                {downVotes}
                <div className="h-[25px] bg-muted-foreground/30 w-[1.5px]"></div>
                <ArrowBigDown size={17} strokeWidth={1}/>
            </div>

            <div className="flex items-center gap-2 justify-center  w-fit rounded border border-muted px-2">
                {upVotes}
                <div className="h-[25px] bg-muted-foreground/30 w-[1.5px]"></div>
                <ArrowBigUp size={17} strokeWidth={1} />
            </div>

        </div>
    )
}

export default BlogActionBar
