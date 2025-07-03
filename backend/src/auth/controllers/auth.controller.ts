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

  /*  Here I have created a endpoint for user registration at(POST /auth/signup) 
      which accepts user details like firstName, lastName, email, and password.
      It uses the CreateUserCommand to create a new user and then generates a JWT token
      for the user. The token is sent back in a cookie named 'auth_token'.
      
  */
  
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

  /*
     The login endpoint (POST /auth/signin) works similarly, accepting email and password,
      validating the user, and returning a JWT token in a cookie.
    
  */

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
      process.env.JWT_SECRET || 'ThISISJWTSECRETTOKENFORBLOGAPP',
      { expiresIn: '1d' },
    );

    res.cookie('auth_token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
    });

    return { message: 'Login successful', data: user };
  }

  /*
      The getProfile endpoint (GET /auth/me) retrieves the user's profile based on the request cookie.
      used to fetch the user profile of the currently authenticated user.
      It uses the GetUserByIdQuery to get the user details from the database.
  */

  @Get('/me')
  getProfile(@Req() req: Request) {
    return this.queryBus.execute(new GetUserByIdQuery(req));
  }
/**
 * The logOut endpoint (GET /auth/logout) clears the authentication cookie from the user cookie
 * 
 */
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
