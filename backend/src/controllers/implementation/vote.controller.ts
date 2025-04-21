import { Request, Response, NextFunction } from "express";
import { IVoteController } from "../interface/IVoteController";
import { HttpStatus } from "@/constants/status.constant";
import { HttpResponse } from "@/constants/response-message.constant";
import { IVoteService } from "@/services/interface/IVoteService";   

export class VoteController implements IVoteController {
  constructor(private readonly _voteService: IVoteService) {}

  async upVote(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const blogId = req.query.blogId as string;

      if (!blogId) {
        res.status(HttpStatus.NOT_FOUND).json({ message: HttpResponse.BLOG_ID_NOT_FOUND})
        return;
      }
        
      const { id: userId } = JSON.parse(req.headers["x-user-payload"] as string);
      await this._voteService.updateUpVote(userId, blogId);
     
      res.status(HttpStatus.CREATED).json({ message: HttpResponse.VOTE_ADDED});
    } catch (error) {
      next(error);
    }
  }

  async downVote(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const blogId = req.query.blogId as string;
      const { id: userId } = JSON.parse(req.headers["x-user-payload"] as string);
      
       await this._voteService.updateDownVote(userId, blogId);
      
      res.status(HttpStatus.CREATED).json({ message: HttpResponse.VOTE_ADDED});
    } catch (error) {
      next(error);
    }
  }

//   async getVotesByBlog(req: Request, res: Response, next: NextFunction): Promise<void> {
//     try {
//       const { blogId } = req.params;
//       const votes = await this._voteService.getVotesByBlog(blogId);

//       res.status(HttpStatus.OK).json({ message: HttpResponse.RESOURCE_FOUND, votes });
//     } catch (error) {
//       next(error);
//     }
//   }

//   async getVoteByUserAndBlog(req: Request, res: Response, next: NextFunction): Promise<void> {
//     try {
//       const { blogId } = req.params;
//       const { id: userId } = JSON.parse(req.headers["x-user-payload"] as string);

//       const vote = await this._voteService.getVoteByUserAndBlog(userId, blogId);
//       res.status(HttpStatus.OK).json({ message: HttpResponse.RESOURCE_FOUND, vote });
//     } catch (error) {
//       next(error);
//     } 
//   }

}
