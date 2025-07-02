import { Request } from 'express';

export class DeleteCommentCommand {
  constructor(
    public readonly req: Request,
    public readonly commentId: string
  ) {}
}