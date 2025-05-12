export interface IVoteService {
  updateUpVote(
    userId: string,
    blogId: string,
  ): Promise<void>;
  updateDownVote(
    userId: string,
    blogId: string,
  ): Promise<void>;
}
