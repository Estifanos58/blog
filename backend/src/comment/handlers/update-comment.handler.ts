import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateCommentCommand } from '../commands/update-comment.command';
import { CommentRepository } from '../repository/comment.repository';
import { UserRepository } from '../../auth/repository/user.repository';
import { getUserFromRequest } from '../../utils/get-user-from-request';
import { ForbiddenException } from '@nestjs/common';

@CommandHandler(UpdateCommentCommand)
export class UpdateCommentHandler implements ICommandHandler<UpdateCommentCommand> {
  constructor(
    private readonly commentRepo: CommentRepository,
    private readonly userRepo: UserRepository
  ) {}

  async execute(command: UpdateCommentCommand) {
    const { req, commentId, content } = command;

    const user = await getUserFromRequest(req, this.userRepo);

    const updated = await this.commentRepo.updateById(commentId, user.id, content);
    if (!updated) throw new ForbiddenException('Not authorized or comment not found');

    return updated;
  }
}
