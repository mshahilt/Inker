
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { followService } from '@/services/followServices';
import { toast } from 'sonner';
import useAuthStore from '@/store/authStore';

export const DEFAULT_IMG = '/path/to/default/profile/image.png';

export type UserData = {
  _id: string;
  name: string;
  username: string;
  profilePicture?: string;
};

type UserCardProps = {
  user: UserData;
  type: 'followers' | 'followings';
  onFollowToggle: (userId: string, isNowFollowing: boolean) => void;
  followStatusMap: Record<string, boolean>;
  onClose: () => void;
};

type UserListModalProps = {
  isOpen: boolean;
  onClose: () => void;
  users: UserData[];
  type: 'followers' | 'followings' | null;
  onFollowCountChange?: (type: 'followers' | 'followings', change: number) => void;
};

const UserCard = ({ user, type, onFollowToggle, followStatusMap, onClose }: UserCardProps) => {
  const [isFollowLoading, setIsFollowLoading] = useState<boolean>(false);
  const { user: currentUser } = useAuthStore();
  const isFollowing = followStatusMap[user._id] || false;
  const isCurrentUser = currentUser?._id === user._id;
  const navigate = useNavigate();

  const handleFollowToggle = async (e: React.MouseEvent) => {
    e.stopPropagation(); 
    
    if (isCurrentUser) return;
    
    setIsFollowLoading(true);
    try {
      await followService.toggleFollow(user._id);
      onFollowToggle(user._id, !isFollowing);
    } catch (err) {
      console.error("Error toggling follow:", err);
      toast.error("Failed to update follow status");
    } finally {
      setIsFollowLoading(false);
    }
  };

  const navigateToUserProfile = () => {
    if (user && user.username) {
      navigate(`/profile/${user.username}`);
      onClose();
    } else {
      toast.error("Could not navigate to user profile: Missing username");
      console.error("Navigation failed - user or username is undefined:", user);
    }
  };

  const getButtonText = () => {
    if (type === 'followers') {
      return isFollowing ? 'Following' : 'Follow Back';
    } else {
      return isFollowing ? 'Following' : 'Follow';
    }
  };

  return (
    <div 
      className="flex items-center py-2 px-4 bg-white dark:bg-[#18181b] hover:bg-gray-50 dark:hover:bg-[#232327] transition-colors duration-300 rounded-lg border-b last:border-b-0 border-gray-100 dark:border-[#26262c] space-x-4 cursor-pointer"
      onClick={navigateToUserProfile}
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        {user.profilePicture ? (
          <img 
            src={user.profilePicture} 
            alt={user.name || ""} 
            className="w-12 h-12 md:w-14 md:h-14 lg:w-12 lg:h-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
          />
        ) : (
          <img 
            src={DEFAULT_IMG} 
            alt={user.name || user.username || ""} 
            className="w-12 h-12 md:w-14 md:h-14 lg:w-12 lg:h-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
          />
        )}
      </div>
      
      {/* User Info */}
      <div className="flex-grow min-w-0">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h3 className="text-sm md:text-base lg:text-base font-bold text-gray-800 dark:text-gray-100 truncate">{user.name}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.username}</p>
          </div>
          
          {/* Follow/Following Button */}
          {!isCurrentUser && (
            <div className='flex items-center gap-3'>
              <button 
                onClick={handleFollowToggle}
                disabled={isFollowLoading}
                className={`px-3 py-1 text-[9px] md:text-sm font-medium rounded-full transition-colors ${
                  isFollowing 
                    ? 'text-white dark:text-black bg-[#18181b] dark:bg-white hover:bg-gray-300 dark:hover:bg-gray-600' 
                    : 'text-white bg-black dark:bg-gray-200 dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-300'
                }`}
              >
                {isFollowLoading ? (
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mx-2" />
                ) : (
                  getButtonText()
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// User List Modal Component
const UserListModal = ({ 
  isOpen, 
  onClose, 
  users = [],
  type,
  onFollowCountChange
}: UserListModalProps) => {
  const [followStatusMap, setFollowStatusMap] = useState<Record<string, boolean>>({});
  const { user: currentUser } = useAuthStore();

  useEffect(() => {
    const loadFollowStatuses = async () => {
      if (!isOpen || !users.length || !currentUser || !type) return;
      
      const statusMap: Record<string, boolean> = {};
      
      try {
        const batchSize = 5;
        for (let i = 0; i < users.length; i += batchSize) {
          const batch = users.slice(i, i + batchSize);
          const statuses = await Promise.all(
            batch.map(async (user) => {
              if (user._id === currentUser._id) return { userId: user._id, isFollowing: false };
              try {
                const res = await followService.checkFollowStatus(user._id);
                return { userId: user._id, isFollowing: res.isFollowing };
              } catch (err) {
                console.error(`Error checking follow status for ${user._id}:`, err);
                return { userId: user._id, isFollowing: false };
              }
            })
          );
          
          statuses.forEach(status => {
            statusMap[status.userId] = status.isFollowing;
          });
          setFollowStatusMap(prev => ({ ...prev, ...statusMap }));
        }
      } catch (err) {
        console.error("Error loading follow statuses:", err);
        toast.error("Failed to load follow information");
      }
    };
    
    loadFollowStatuses();
  }, [isOpen, users, currentUser, type]);

  const handleFollowToggle = (userId: string, isNowFollowing: boolean) => {
    setFollowStatusMap(prev => ({
      ...prev,
      [userId]: isNowFollowing
    }));

    if (onFollowCountChange && type) {
      if (type === 'followers' && isNowFollowing) {
        onFollowCountChange('followings', 1);
      }
      else if (type === 'followers' && !isNowFollowing) {
        onFollowCountChange('followings', -1);
      }
      else if (type === 'followings') {
        onFollowCountChange('followings', isNowFollowing ? 0 : -1);
      }
    }
  };

  if (!isOpen || !type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md md:max-w-xl lg:max-w-2xl bg-white dark:bg-[#0a0a0a]  rounded-2xl shadow-2xl overflow-hidden animate-appear">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-lg md:text-xl font-bold text-gray-800 dark:text-gray-100 capitalize">
            {type} ({users.length})
          </h2>
          <button 
            onClick={onClose} 
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* User List with Scrollable Container */}
        <div className="max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-800">
          {users.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm md:text-base">
              No {type} found
            </div>
          ) : (
            users.map(user => (
              <UserCard 
                key={user._id} 
                user={user} 
                type={type}
                onFollowToggle={handleFollowToggle}
                followStatusMap={followStatusMap}
                onClose={onClose}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UserListModal;