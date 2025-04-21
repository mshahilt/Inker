import { DEFAULT_IMG } from "@/utils/constents"
import { FC } from "react"
import { useNavigate } from "react-router-dom";

interface BlogAuthorInfoProps {
    authorName: string;
    authorProfilePicture: string;
}

const BlogAuthorInfo: FC<BlogAuthorInfoProps> = ({ authorName, authorProfilePicture}) => {
    const navigate = useNavigate()
    return (
        <div className="flex w-full items-center">
            <img
                src={authorProfilePicture || DEFAULT_IMG}
                alt="Profile"
                className="w-10 h-10 rounded-full mr-3 object-cover"
            />
            <div className="relative group inline-block">
                <span className="font-medium cursor-pointer"
                    onClick={() => navigate(`/profile/${authorName}`)}>
                    {authorName}
                </span>
                <div className="absolute bottom-full mb-2 hidden group-hover:block bg-black dark:bg-white dark:text-black text-white text-xs rounded py-1 px-2 z-10 whitespace-nowrap">
                    View Profile
                </div>
            </div>
        </div>
    )
}

export default BlogAuthorInfo
