import { ChevronLeft } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProfileData, ProfileService } from "@/services/profileService";
import { formatDateToMonthYear } from "@/utils/formateDate";
import { Button } from "@/components/ui/button";
import useAuthStore from "@/store/authStore";
import { useBlogStore } from "@/store/blogStore";
import { DEFAULT_IMG } from "@/utils/constents";
import { Skeleton } from "@/components/ui/skeleton";
import { followService } from "@/services/followServices";
import { toast } from "sonner";
import { AxiosError } from "axios";
import UserListModal, { UserData } from "./UserListModal";



const ProfileInfo: FC = () => {
  const { setAuthorId, setLoading, isLoading } = useBlogStore()
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFollowLoading, setIsFollowLoading] = useState(false);
  const [modalType, setModalType] = useState<'followers' | 'followings' | null>(null);
  const [modalUsers, setModalUsers] = useState<UserData[]>([]);
  const [userDetails, setUserDetails] = useState<ProfileData>((): ProfileData => {
    return {
      username: '',
      _id: '',
      email: '',
      role: 'user',
      profilePicture: '',
      dateOfBirth: '',
      name: '',
      bio: '',
      resume: '',
      followers: null,
      followings : null,
      createdAt: '',
      socialLinks: []
    };
  });
  const navigate = useNavigate();
  const { userTag } = useParams();
  console.log('This is the user Tag:',userTag)
  const { user } = useAuthStore()
  
  useEffect(() => {
  const checkFollow = async () => {
    if (!userDetails._id || user?._id === userDetails._id) return;

    try {
      const res = await followService.checkFollowStatus(userDetails._id);
      setIsFollowing(res.isFollowing);
    } catch (err) {
        const error = err as AxiosError<{ message: string }>;
        console.error("Error checking follow status:", error);
        const message = error.response?.data?.message || "Failed to check follow status.";
        toast.error(message);
      }
    };

  checkFollow();
  }, [userDetails._id, user?._id]);
  
  const handleFollowToggle = async () => {
  setIsFollowLoading(true);
  try {
    const res = await followService.toggleFollow(userDetails._id);

    if (res) {
      setIsFollowing((prev) => !prev);

      setUserDetails((prevDetails) => ({
        ...prevDetails,
        followers:
          prevDetails.followers !== null
            ? isFollowing
              ? prevDetails.followers - 1
              : prevDetails.followers + 1
            : isFollowing
              ? 0
              : 1,
      }));
    }
  } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      console.error("Error toggling follow:", error);
      const message = error.response?.data?.message || "Something went wrong while toggling follow.";
      toast.error(message);
    } finally {
      setIsFollowLoading(false);
    }
  };

  useEffect(() => {
    const fetchModalUsers = async () => {
      if (!modalType) return;
  
      try {
        const response = await followService.getFollowUsers(userDetails._id , modalType);
        setModalUsers(response.users);
      } catch (err) {
        console.error("Error fetching users:", err);
        toast.error("Failed to load users.");
      }
    };
  
    fetchModalUsers();
  }, [modalType , userDetails._id]);

  useEffect(() => {
    setLoading(true)
    const fetchUserProfile = async () => {

      let result: {
        message: string;
        profileDetails: ProfileData;
      } | null = null

      
      result = await ProfileService.profileDetailsService(userTag as string);

      if (result.profileDetails?._id) setAuthorId(result.profileDetails?._id)
      setUserDetails(result.profileDetails)
    };

    fetchUserProfile();
  }, [userTag, setAuthorId, setLoading]);

  const handleFollowCountChange = (type: 'followers' | 'followings', change: number) => {
    setUserDetails(prevDetails => ({
      ...prevDetails,
      [type]: prevDetails[type] !== null ? prevDetails[type]! + change : change > 0 ? change : 0
    }));
  };
  
  const handleModalClose = () => {
    setModalType(null);
    if (userTag) {
      ProfileService.profileDetailsService(userTag as string)
        .then(result => {
          if (result.profileDetails) {
            setUserDetails(prevDetails => ({
              ...prevDetails,
              followers: result.profileDetails.followers,
              followings: result.profileDetails.followings
            }));
          }
        })
        .catch(err => console.error("Error refreshing profile counts:", err));
    }
  };

  return (
    <div className="min-w-[300px]  lg:w-[400px] p-2 lg:border-x lg:h-full">
      <div className="flex justify-between items-center mb-5 px-2">
        <div className="flex cursor-pointer" onClick={() => navigate(-1)}>
          <ChevronLeft strokeWidth={1.8} className="md:hidden"  />
          <p> Profile</p>
        </div>
      <div className="flex gap-3">
        {userTag === user?.username ? (
          <Button className="active:scale-95" onClick={() => navigate("/account/profile")}>
            Edit Profile
          </Button>
        ) : (
          <Button
            className={`active:scale-95 ${isFollowing ? "bg-gray-200 hover:bg-gray-300 text-black" : "bg-transparent hover:bg-transparent text-black/80 border-2 border-black/80 dark:text-white/80 dark:border-white/80 "}`}
            onClick={handleFollowToggle}
            disabled={isFollowLoading} 
          >
            {isFollowLoading ? (
              <div className={`${isFollowing? '' : ''} w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin`} />
            ) : (
              isFollowing ? "Following" : "Follow"
            )}
          </Button>
        )}
      </div>
      </div>

      <div className="w-full  p-1 rounded-3xl mb-3 flex items-center">
        { isLoading ? 
        <Skeleton className="w-[100px] h-[100px] rounded-md"/>
         : <img
          className="w-26 h-26 rounded-3xl"
          src={userDetails?.profilePicture || DEFAULT_IMG}
          alt=""
        /> }
        <div className="flex justify-around w-full">
          <div className="flex flex-col items-center group">
            <p
              onClick={() => setModalType('followers')}
              className="relative cursor-pointer text-gray-900 dark:text-white hover:text-gray-600
                before:content-[''] before:absolute before:bottom-0 before:left-1/2
                before:-translate-x-1/2 before:w-0 before:h-[2px]
                before:transition-all before:duration-300 before:ease-in-out
                group-hover:before:w-full
                before:bg-black dark:before:bg-white">
              followers
            </p>
            <p className="font-semibold">{userDetails?.followers}</p>
          </div>

          <div className="flex flex-col items-center group">
            <p
              onClick={() => setModalType('followings')}
              className="relative cursor-pointer text-gray-900 dark:text-white hover:text-gray-600
                before:content-[''] before:absolute before:bottom-0 before:left-1/2
                before:-translate-x-1/2 before:w-0 before:h-[2px]
                before:transition-all before:duration-300 before:ease-in-out
                group-hover:before:w-full
                before:bg-black dark:before:bg-white">
              followings
            </p>
            <p className="font-semibold">{userDetails?.followings}</p>
          </div>
        </div>
        <UserListModal 
          isOpen={modalType !== null}
          onClose={handleModalClose}
          type={modalType}
          users={modalUsers}
          onFollowCountChange={handleFollowCountChange}
        />
      </div>

      <div className="p-2 flex flex-col gap-3">
      { isLoading ? 
        <Skeleton className="w-[50%] h-6 rounded-md"/>
         :  <p className="text-xl font-semibold">{userDetails?.name}</p> }

         { isLoading ? 
        <Skeleton className="w-full h-26 rounded-3xl"/>
         : <p className="text-sm px-1 font-light text-muted-foreground">
          {userDetails?.bio}
        </p>}
        { isLoading ? 
        <Skeleton className="w-full h-3 rounded-3xl"/>
         : <div className="flex gap-2 items-center mt-2">
          <p className="text-sm text-gray-600">@{userDetails?.username}</p>
          <p className="text-xs text-gray-400">. Joined {formatDateToMonthYear(userDetails?.createdAt)}</p>
        </div>}
        <div className="flex gap-2 text-sm font-light text-muted-foreground">
          <p>
            <span className="font-semibold text-foreground">0</span> Posts
          </p>
          <p>
            <span className="font-semibold text-foreground">0</span> Views
          </p>
          <p>
            <span className="font-semibold text-foreground">0</span> Upvotes
          </p>
        </div>
      </div>
      <div className="mt-4 px-2">
        <h2 className="text-lg font-semibold mb-2">Social Links</h2>
        { isLoading ? 
        <>
        <Skeleton className="w-26 h-10 mt-2"/>
        <Skeleton className="w-26 h-10 mt-2"/>
         </>: <div className="flex flex-wrap gap-2">
          {userDetails.socialLinks.length > 0 ? (
            userDetails.socialLinks.map((link, index) => (
              <div className="hover:bg-muted px-4 py-1 rounded-full border transition-all text-sm duration-300 hover:scale-105">
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.platform}
                </a>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No social links added.</p>
          )}
        </div>}
      </div>
    </div>
  );
};

export default ProfileInfo;
