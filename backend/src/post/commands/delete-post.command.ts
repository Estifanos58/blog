import { Request } from 'express';

export class DeletePostCommand {
  constructor(
    public readonly req: Request,
    public readonly postId: string
  ) {}
}