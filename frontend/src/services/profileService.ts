import { axiosInstance } from "@/config/axios";
import { AxiosError } from "axios";
import { toast } from "sonner";



interface profileData {
    name: string;
    bio: string;
    resume: string;
    socials: {platform: string, url: string}[] 
}

export const AuthService = {
  updateProfileService: async (data: profileData): Promise<{ status: number; message: string, updatedFields: string[]}> => {
    try {
      const response = await axiosInstance.put<{ status: number; message: string, updatedFields: string[]}> ("/api/profile/update", data);
      return response.data;
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      toast.error(err.response?.data?.error || "Profile update failed. Please try again.");
      throw new Error(err.response?.data?.error || "Profile update failed.");
    }
  },

}