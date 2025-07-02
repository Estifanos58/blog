// app/repository/comment.repository.impl.ts
import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CommentRepository } from './comment.repository';

@Injectable()
export class CommentRepositoryImpl implements CommentRepository {
  constructor(private readonly prisma: DatabaseService) {}

  async create(data: {
    userId: string;
    postId: string;
    content: string;
  }) {
    return this.prisma.comment.create({
      data: {
        userId: data.userId,
        postId: data.postId,
        content: data.content,
      },
    });
  }
}
