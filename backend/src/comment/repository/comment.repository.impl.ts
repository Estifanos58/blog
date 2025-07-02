// app/repository/comment.repository.impl.ts
import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CommentRepository } from './comment.repository';

@Injectable()
export class CommentRepositoryImpl implements CommentRepository {
  constructor(private readonly prisma: DatabaseService) {}

  async create(data: { userId: string; postId: string; content: string }) {
    return this.prisma.comment.create({
      data: {
        userId: data.userId,
        postId: data.postId,
        content: data.content,
      },
    });
  }

  async updateById(
    commentId: string,
    userId: string,
    content: string,
  ): Promise<any | null> {
    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment || comment.userId !== userId) return null;

    return this.prisma.comment.update({
      where: { id: commentId },
      data: { content },
    });
  }

  async deleteById(commentId: string, userId: string): Promise<boolean> {
    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
    });
    if (!comment || comment.userId !== userId) return false;

    await this.prisma.comment.delete({ where: { id: commentId } });
    return true;
  }
}
