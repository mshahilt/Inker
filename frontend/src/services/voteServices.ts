import { axiosInstance } from "@/config/axios";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const VoteService = {
  upVote: async (blogId: string) => {
    try {
      const response = await axiosInstance.post<{
        status: number;
        message: string;
      }>("/api/vote/upvote", { params: { blogId }});
      return response.data;
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      toast.error(
        err.response?.data?.error || "Attempt failed, Please try again."
      );
      throw new Error(err.response?.data?.error || "Attempt failed");
    }
  },

  downVote: async (blogId: string) => {
    try {
      const response = await axiosInstance.post<{
        status: number;
        message: string;
      }>("/api/vote/downvote", { params: { blogId }});
      return response.data;
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      toast.error(
        err.response?.data?.error || "Attempt failed, Please try again."
      );
      throw new Error(err.response?.data?.error || "Attempt failed");
    }
  },
};
