// app/controllers/auth.controller.ts
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../commands/create-user.command';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { LoginUserCommand } from '../commands/login-user.command';
import { LoginUserDto } from '../dto/login-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { GetUserByIdQuery } from '../queries/get-user-id.query';
import { getUserFromRequest } from 'src/utils/get-user-from-request';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('signup')
  @HttpCode(201)
  async register(
    @Body() dto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.commandBus.execute(
      new CreateUserCommand(
        dto.firstName,
        dto.lastName,
        dto.email,
        dto.password,
      ),
    );

    const token = jwt.sign(
      { sub: user.id, email: user.email },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1d' },
    );

    res.cookie('auth_token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false, // true in production
    });

    return { message: 'User created successfully', data: user };
  }

  @Post('signin')
  @HttpCode(200)
  async login(
    @Body() dto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.commandBus.execute(
      new LoginUserCommand(dto.email, dto.password),
    );

    const token = jwt.sign(
      { sub: user.id, email: user.email },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1d' },
    );

    res.cookie('auth_token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
    });

    return { message: 'Login successful', data: user };
  }

  @Get('/me')
  getProfile(@Req() req: Request) {
    return this.queryBus.execute(new GetUserByIdQuery(req));
  }

  @Get('/logout')
  @HttpCode(200)
  logOut(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('auth_token', {
      httpOnly: true,
      sameSite: 'lax',
      secure: false, // set to true in production
    });

    return { message: 'Logged out successfully' };
  }
}
