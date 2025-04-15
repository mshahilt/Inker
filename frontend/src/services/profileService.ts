import { axiosInstance } from "@/config/axios";
import { AxiosError } from "axios";
import { toast } from "sonner";

interface UpdateProfileData {
  name: string;
  bio: string;
  resume?: string;
  socialLinks: {
    platform: string;
    url: string;
  }[];
}

export interface ProfileData extends UpdateProfileData {
  _id: string;
  username: string;
  email: string;
  status?: "Active" | "Inactive" | "Pending";
  role: "user" | "admin";
  profilePicture: string;
  dateOfBirth: string;
  created_at: string;
  updatedAt?: string;
}

export const ProfileService = {
  updateProfileService: async (
    data: UpdateProfileData
  ): Promise<{ message: string; updatedFields: string[] }> => {
    try {
      const response = await axiosInstance.put<{
        message: string;
        updatedFields: string[];
      }>("/api/profile/update-profile", data, { withCredentials: true });
      return response.data;
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      toast.error(
        err.response?.data?.error || "Profile update failed. Please try again."
      );
      throw new Error(err.response?.data?.error || "Profile update failed.");
    }
  },

  profileDetailsService: async (
    username: string
  ): Promise<{ message: string; profileDetails: ProfileData }> => {
    try {
      const response = await axiosInstance.get<{
        message: string;
        profileDetails: ProfileData;
      }>(`api/profile/${username}`);
      return response.data;
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      toast.error(
        err.response?.data?.error || "Profile details fetching failed. Please try again."
      );
      throw new Error(err.response?.data?.error || "Profile details fetching failed.");
    }
  },

  changeEmailService: async (data: {
    oldEmail: string;
    newEmail: string;
  }): Promise<{ status: number; message: string }> => {
    try {
      const response = await axiosInstance.patch<{ status: number; message: string }>(
        "api/profile/change-email",
        data
      );
      return response.data;
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      toast.error(
        err.response?.data?.error || "Attempt to change email failed. Please try again."
      );
      throw new Error(err.response?.data?.error || "Attempt to change email failed.");
    }
  },

  changeUsernameService: async (data: {
    username: string;
  }): Promise<{ status: number; message: string }> => {
    try {
      const response = await axiosInstance.patch<{ status: number; message: string }>(
        "api/profile/change-username",
        data
      );
      return response.data;
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      toast.error(
        err.response?.data?.error ||
          "Attempt to change username failed. Please try again."
      );
      throw new Error(err.response?.data?.error || "Attempt to change username failed.");
    }
  },

  changePasswordService: async (data: {
    userId: string;
    oldPassword: string;
    newPassword: string;
  }): Promise<{ status: number; message: string }> => {
    try {
      const response = await axiosInstance.patch<{ status: number; message: string }>(
        "api/profile/change-password",
        data,
        { withCredentials: true }
      );
      return response.data;
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      toast.error(
        err.response?.data?.error ||
          "Attempt to change password failed. Please try again."
      );
      throw new Error(err.response?.data?.error || "Attempt to change password failed.");
    }
  },

  changeProfilePictureService: async (
    file: File
  ): Promise<{ profileUrl: string; message: string }> => {
    try {
      const formData = new FormData();
      formData.append("profilePicture", file);

      const response = await axiosInstance.patch<{ profileUrl: string; message: string }>(
        "api/profile/change-profile-picture",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      toast.error(
        err.response?.data?.error ||
          "Attempt to change profile picture failed. Please try again."
      );
      throw new Error(
        err.response?.data?.error || "Attempt to change profile picture failed."
      );
    }
  },
};
