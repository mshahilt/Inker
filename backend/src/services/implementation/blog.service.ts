import { IBlogService } from "../interface/IBlogService";
import { IBlogRepository } from "@/repositories/interface/IBlogRepository";

//!   Implementation for Auth Service
export class BlogService implements IBlogService {
  constructor(private readonly _blogRepository: IBlogRepository) {}
}
