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

  /**
   * 
   * Endpoint to create a comment on a post.
   * By using the PostId from the param and the userId from the cookie.
   */
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

  /**
   * Endpoint to update a comment by its ID.
   * It uses the UpdateCommentCommand to update the comment content.
   * It First validate if the current user is the one who created the comment
   * CURRENTLY NOT IMPLEMENTED IN FRONTEND
   */

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

  /**
   * 
   *Endpoint to delete a comment by its ID.
   *By validating if the current user is the one who created the comment.
   *CURRENTLY NOT IMPLEMENTED IN FRONTEND
   * It uses the DeleteCommentCommand to delete the comment.
   */
  @Delete('/:id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    return this.commandBus.execute(new DeleteCommentCommand(req, id));
  }
}
