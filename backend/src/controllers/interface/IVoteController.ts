import {
    Request,
    Response,
    NextFunction
} from "express";

export interface IVoteController{
    upVote(req: Request, res: Response, next: NextFunction): Promise<void> 
    downVote(req: Request, res: Response, next: NextFunction): Promise<void> 
    // createVote(req: Request, res: Response, next: NextFunction): Promise<void>
    // updateVote(req: Request, res: Response, next: NextFunction): Promise<void>
    // deleteVote(req: Request, res: Response, next: NextFunction): Promise<void>
}