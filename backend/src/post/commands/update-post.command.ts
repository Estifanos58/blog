import { Request } from 'express';

export class UpdatePostCommand {
  constructor(
    public readonly req: Request,
    public readonly postId: string,
    public readonly content: string
  ) {}
}