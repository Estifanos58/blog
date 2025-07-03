
import { Request } from 'express';

export class CreateCommentCommand {
  constructor(
    public readonly req: Request,
    public readonly postId: string,
    public readonly content: string
  ) {}
}
