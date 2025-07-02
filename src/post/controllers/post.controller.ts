
import { Controller, Post, Body, Req } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreatePostDto } from '../dto/create-post.dto';
import { CreatePostCommand } from '../commands/create-post.command';
import { Request } from 'express';

@Controller('posts')
export class PostController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async create(@Body() dto: CreatePostDto, @Req() req: Request) {
    return this.commandBus.execute(
      new CreatePostCommand(req, dto.content)
    );
  }
}
