import {
  Controller,
  Post,
  Body,
  Req,
  Get,
  Param,
  Put,
  Delete,
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

  /**
   * 
   *Endpoint to create a Blog (POST posts/)
   *Like the comment this also gets the user who created the blog from the cookie
   */
  @Post()
  async create(@Body() dto: CreatePostDto, @Req() req: Request) {
    return this.commandBus.execute(new CreatePostCommand(req, dto.content, dto.title, dto.image, dto.description));
  }

  /**
   *Endpoint to get all the posts (GET posts/) 
   * doesn't need to authenticate the current user because to see peoples blogs user don't have to create an account
   */
  @Get()
  async findAll() {
    return this.queryBus.execute(new GetAllPostsQuery());
  }

  /**
   * 
   * EndPoint to Update post (POST posts/:id)
   * this controller gets the current user from the cookie in the update-post.handler and only update 
   * if the user is the one who created the post. this validation is also used in the frontend for better protection 
   * in Normal condition the user will not be able to see the edit button in the client side but if he force the request using javascript
   * this controller won't allow it to change 
   */
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdatePostDto,
    @Req() req: Request,
  ) {
    return this.commandBus.execute(new UpdatePostCommand(req, id , dto.title, dto.description, dto.content ));
  }

  /**
   * 
   *EndPoint to delete post (DELETE posts/:id)
   *this controller have the same protection like the update and won't be used by wrong person
   */
  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    return this.commandBus.execute(new DeletePostCommand(req, id));
  }
}
