// app/handlers/delete-post.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeletePostCommand } from '../commands/delete-post.command';
import { PostRepository } from '../repository/post.repository';
import { UserRepository } from '../../auth/repository/user.repository';
import { getUserFromRequest } from '../../utils/get-user-from-request';
import { ForbiddenException } from '@nestjs/common';

@CommandHandler(DeletePostCommand)
export class DeletePostHandler implements ICommandHandler<DeletePostCommand> {
  constructor(
    private readonly postRepo: PostRepository,
    private readonly userRepo: UserRepository
  ) {}

  async execute(command: DeletePostCommand): Promise<any> {
    const { req, postId } = command;
    const user = await getUserFromRequest(req, this.userRepo);

    const deleted = await this.postRepo.deleteById(postId, user.id);
    if (!deleted) throw new ForbiddenException('Not authorized or post not found');

    return { message: 'Post deleted successfully' };
  }
}
