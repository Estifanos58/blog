import { Request } from 'express';

export class CreatePostCommand {
  constructor(
    public readonly req: Request,
    public readonly content: string
  ) {}
}