
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePostCommand } from '../commands/create-post.command';
import { PostRepository } from '../repository/post.repository';
import { UserRepository } from '../../auth/repository/user.repository';
import { getUserFromRequest } from '../../utils/get-user-from-request';
import { Request } from 'express';

@CommandHandler(CreatePostCommand)
export class CreatePostHandler implements ICommandHandler<CreatePostCommand> {
  constructor(
    private readonly postRepo: PostRepository,
    private readonly userRepo: UserRepository
  ) {}

  async execute(command: CreatePostCommand): Promise<any> {
    const { req, content } = command;

    const user = await getUserFromRequest(req, this.userRepo);

    return this.postRepo.create({
      userId: user.id,
      content,
    });
  }
}
