import { Request } from 'express';

export class UpdatePostCommand {
  constructor(
    public readonly req: Request,
    public readonly postId: string,
    public readonly title: string,
    public readonly description: string,
    public readonly content: string
  ) {}
}