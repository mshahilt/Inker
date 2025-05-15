import { axiosInstance } from "@/config/axios";


export const followService = {
  toggleFollow: async (userId: string) => {
    const response = await axiosInstance.post(`/api/follow/${userId}`);
    return response.data;
  },
  checkFollowStatus: async (userId: string) => {
    const response = await axiosInstance.get(`/api/follow/status/${userId}`);
    return response.data;
  },
  getFollowUsers: async (userId: string, type: "followers" | "followings") => {
    const response = await axiosInstance.get(`/api/follow/${userId}?type=${type}`);
    return response.data;
  }
};