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

const CommentHandlers = [CreateCommentHandler];

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
