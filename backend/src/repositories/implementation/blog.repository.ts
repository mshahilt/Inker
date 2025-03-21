import { BaseRepository } from "../base.repository";
import { IBlogRepository } from "../interface/IBlogRepository";
import Blog, { IBlogModel } from "@/models/implementation/blog.model";

export class BlogRepository
  extends BaseRepository<IBlogModel>
  implements IBlogRepository
{
  constructor() {
    super(Blog);
  }
}
