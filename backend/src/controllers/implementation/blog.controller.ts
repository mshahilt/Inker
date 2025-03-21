import { IBlogController } from "../interface/IBlogController";
import { IBlogService } from "@/services/interface/IBlogService";

export class BlogController implements IBlogController {
  constructor(private _blogService: IBlogService) {}
}
