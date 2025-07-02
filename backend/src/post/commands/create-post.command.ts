import { Request } from 'express';

export class CreatePostCommand {
  constructor(
    public readonly req: Request,
    public readonly content: string,
    public readonly title: string,
    public readonly image: string,
    public readonly description: string
  ) {}
}