// app/comment/controllers/comment.controller.ts
import {
  Controller,
  Post,
  Body,
  Req,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { CommandBus } from '@nestjs/cqrs';
import { CreateCommentCommand } from '../commands/create-comment.command';
import { Request } from 'express';
import { UpdateCommentDto } from '../dto/update-comment.dto';
import { UpdateCommentCommand } from '../commands/update-comment.command';
import { DeleteCommentCommand } from '../commands/delete-comment.command';

@Controller('posts/:postId/comments')
export class CommentController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async create(
    @Param('postId') postId: string,
    @Body() dto: CreateCommentDto,
    @Req() req: Request,
  ) {
    return this.commandBus.execute(
      new CreateCommentCommand(req, postId, dto.content),
    );
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateCommentDto,
    @Req() req: Request,
  ) {
    return this.commandBus.execute(
      new UpdateCommentCommand(req, id, dto.content),
    );
  }

  @Delete('/:id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    return this.commandBus.execute(new DeleteCommentCommand(req, id));
  }
}
