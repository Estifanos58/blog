import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteCommentCommand } from '../commands/delete-comment.command';
import { CommentRepository } from '../repository/comment.repository';
import { UserRepository } from '../../auth/repository/user.repository';
import { getUserFromRequest } from '../../utils/get-user-from-request';
import { ForbiddenException } from '@nestjs/common';

@CommandHandler(DeleteCommentCommand)
export class DeleteCommentHandler implements ICommandHandler<DeleteCommentCommand> {
  constructor(
    private readonly commentRepo: CommentRepository,
    private readonly userRepo: UserRepository
  ) {}

  async execute(command: DeleteCommentCommand) {
    const { req, commentId } = command;

    const user = await getUserFromRequest(req, this.userRepo);
    const deleted = await this.commentRepo.deleteById(commentId, user.id);

    if (!deleted) {
      throw new ForbiddenException('Not authorized or comment not found');
    }

    return { message: 'Comment deleted successfully' };
  }
}
