// app/comment/controllers/comment.controller.ts
import { Controller, Post, Body, Req, Param } from '@nestjs/common';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { CommandBus } from '@nestjs/cqrs';
import { CreateCommentCommand } from '../commands/create-comment.command';
import { Request } from 'express';

@Controller('posts/:postId/comments')
export class CommentController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async create(
    @Param('postId') postId: string,
    @Body() dto: CreateCommentDto,
    @Req() req: Request
  ) {
    return this.commandBus.execute(
      new CreateCommentCommand(req, postId, dto.content)
    );
  }
}
