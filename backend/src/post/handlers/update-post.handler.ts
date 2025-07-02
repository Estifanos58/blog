
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdatePostCommand } from '../commands/update-post.command';
import { PostRepository } from '../repository/post.repository';
import { UserRepository } from '../../auth/repository/user.repository';
import { getUserFromRequest } from '../../utils/get-user-from-request';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

@CommandHandler(UpdatePostCommand)
export class UpdatePostHandler implements ICommandHandler<UpdatePostCommand> {
  constructor(
    private readonly postRepo: PostRepository,
    private readonly userRepo: UserRepository
  ) {}

  async execute(command: UpdatePostCommand) {
    const { req, postId, content } = command;
    const user = await getUserFromRequest(req, this.userRepo);

    const updated = await this.postRepo.updateById(postId, user.id, content);
    if (!updated) throw new ForbiddenException('Not authorized or post not found');

    return updated;
  }
}
