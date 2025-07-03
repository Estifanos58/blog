import {
  Controller,
  Post,
  Body,
  Req,
  Get,
  Param,
  Put,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreatePostDto } from '../dto/create-post.dto';
import { CreatePostCommand } from '../commands/create-post.command';
import { Request } from 'express';
import { GetAllPostsQuery } from '../queries/get-all-posts.query';
import { UpdatePostDto } from '../dto/update-post.dto';
import { UpdatePostCommand } from '../commands/update-post.command';
import { DeletePostCommand } from '../commands/delete-post.command';


@Controller('posts')
export class PostController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async create(@Body() dto: CreatePostDto, @Req() req: Request) {
    return this.commandBus.execute(new CreatePostCommand(req, dto.content, dto.title, dto.image, dto.description));
  }

  @Get()
  async findAll() {
    return this.queryBus.execute(new GetAllPostsQuery());
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdatePostDto,
    @Req() req: Request,
  ) {
    return this.commandBus.execute(new UpdatePostCommand(req, id , dto.title, dto.description, dto.content ));
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    return this.commandBus.execute(new DeletePostCommand(req, id));
  }
}
