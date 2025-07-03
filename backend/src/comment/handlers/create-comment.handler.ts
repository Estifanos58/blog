import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCommentCommand } from '../commands/create-comment.command';
import { CommentRepository } from '../repository/comment.repository';
import { PostRepository } from '../../post/repository/post.repository';
import { UserRepository } from '../../auth/repository/user.repository';
import { getUserFromRequest } from '../../utils/get-user-from-request';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(CreateCommentCommand)
export class CreateCommentHandler implements ICommandHandler<CreateCommentCommand> {
  constructor(
    private readonly commentRepo: CommentRepository,
    private readonly postRepo: PostRepository,
    private readonly userRepo: UserRepository
  ) {}

  async execute(command: CreateCommentCommand) {
    const { req, postId, content } = command;

    const user = await getUserFromRequest(req, this.userRepo);

    const post = await this.postRepo.findById(postId);
    if (!post) throw new NotFoundException('Post not found');

    return this.commentRepo.create({
      userId: user.id,
      postId,
      content,
    });
  }
}
