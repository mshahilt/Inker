import { ChevronLeft } from "lucide-react";
import { FC, useEffect, useState } from "react";
import Button from "../../ui/button";
import { useNavigate } from "react-router-dom";
import { ProfileData, ProfileService } from "@/services/profileService";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { formatDateToMonthYear } from "@/utils/formateDate";

const ProfileInfo: FC = () => {
  const navigate = useNavigate();
  const { role, username } = useSelector((state: RootState) => state.auth.user)
  const [userDetails, setUserDetails] = useState<ProfileData>((): ProfileData => {
    return {
      username: '',
      _id: '',
      email: '',
      role: role === 'admin' ? 'admin' : 'user',
      profilePicture: '',
      dateOfBirth: '',
      name: '',
      bio: '',
      resume: '',
      createdAt: '',
      socialLinks: []
    };
  });
  useEffect(() => {
    const fetchUserProfile = async () => {
      const result = await ProfileService.profileDetailsService(username);
      setUserDetails(result.profileDetails)
    };

    if(username) fetchUserProfile();
  }, [username]);

  return (
    <div className="min-w-[300px] lg:w-[400px] p-2 lg:border lg:h-full">
      <div className="flex justify-between items-center mb-5 px-2">
        <div className="flex">
          <ChevronLeft strokeWidth={1.8} className="md:hidden" />
          <p> Profile</p>
        </div>
        <Button className="active:scale-95" onClick={() => navigate("/account/profile")}>
          Edit Profile
        </Button>
      </div>

      <div className="w-full  p-1 rounded-3xl mb-3 flex items-center">
        <img
          className="w-26 h-26 rounded-3xl"
          src={userDetails?.profilePicture || "https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg"}
          alt=""
        />
        <div className="flex justify-around w-full">
          <div className="flex flex-col items-center">
            <p>followers</p>
            <p className="font-semibold">0</p>
          </div>
          <div className="flex flex-col items-center">
            <p>followings</p>
            <p className="font-semibold">0</p>
          </div>
        </div>
      </div>

      <div className="p-2 flex flex-col gap-3">
        <p className="text-xl font-semibold">{userDetails?.name}</p>
      <p className="text-sm px-1 font-medium text-neutral-500">
        {userDetails.bio}
      </p>
        <div className="flex gap-2 items-center mt-2">
          <p className="text-sm text-gray-600">@{userDetails?.username}</p>
          <p className="text-xs text-gray-400">. Joined {formatDateToMonthYear(userDetails.createdAt)}</p>
        </div>
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
        <div className="flex flex-col gap-2">
          {userDetails.socialLinks.length > 0 ? (
            userDetails.socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {link.platform}
              </a>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No social links added.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
