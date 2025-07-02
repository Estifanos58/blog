import { Request } from 'express';

export class UpdateCommentCommand {
  constructor(
    public readonly req: Request,
    public readonly commentId: string,
    public readonly content: string
  ) {}
}