// app/comment/comment.module.ts
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DatabaseService } from 'src/database/database.service';
import { CommentController } from './controllers/comment.controller';
import { CreateCommentHandler } from './handlers/create-comment.handler';
import { CommentRepository } from './repository/comment.repository';
import { CommentRepositoryImpl } from './repository/comment.repository.impl';
import { AuthModule } from 'src/auth/auth.module';
import { PostModule } from 'src/post/post.module';
import { UpdateCommentHandler } from './handlers/update-comment.handler';
import { DeleteCommentHandler } from './handlers/delete-comment.handler';

const CommentHandlers = [CreateCommentHandler, UpdateCommentHandler, DeleteCommentHandler];

@Module({
  imports: [CqrsModule, AuthModule, PostModule],
  controllers: [CommentController],
  providers: [
    DatabaseService,
    ...CommentHandlers,
    {
      provide: CommentRepository,
      useClass: CommentRepositoryImpl,
    },
  ],
})
export class CommentModule {}
