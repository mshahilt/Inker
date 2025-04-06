import { createContext, useContext, useState, useEffect, FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { ProfileService } from '@/services/profileService';

export interface UpdateProfileData {
  name: string;
  bio: string;
  resume?: string;
  socialLinks?: { platform: string; url: string }[];
}

export interface ProfileData extends UpdateProfileData {
  _id: string;
  username: string;
  email: string;
  status?: 'Active' | 'Inactive' | 'Pending';
  role: 'user' | 'admin';
  profilePicture: string;
  dateOfBirth: string;
  createdAt: string;
  updatedAt?: string;
}

interface ProfileContextProps {
  profile: ProfileData;
  setProfile: (data: ProfileData) => void;
  loading: boolean;
  error: string | null;
}

const defaultProfile: ProfileData = {
  _id: '',
  username: '',
  email: '',
  name: '',
  bio: '',
  resume: '',
  profilePicture: '',
  dateOfBirth: '',
  role: 'user',
  status: 'Active',
  createdAt: '',
  socialLinks: [],
};

const ProfileContext = createContext<ProfileContextProps | undefined>(undefined);

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) throw new Error('useProfile must be used within a ProfileProvider');
  return context;
};

export const ProfileProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!user?.id) return;

      setLoading(true);
      setError(null);

      try {
        const response = await ProfileService.profileDetailsService(user.username);
        setProfile(response.profileDetails);
      } catch (err: any) {
        setError(err?.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [user?.id]);

  return (
    <ProfileContext.Provider value={{ profile, setProfile, loading, error }}>
      {children}
    </ProfileContext.Provider>
  );
};
