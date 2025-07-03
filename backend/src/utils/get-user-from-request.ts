import { Request } from 'express';
import { UserRepository } from '..//auth/repository/user.repository';
import { UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

/**
 *  A reusable function to get the user token from cookie and validate if the users token are real
 * Many controllers uses this function to authenticate the user who sends a request serving like a Middleware
 * */
export async function getUserFromRequest(
  req: Request,
  userRepo: UserRepository
) {
  const token = req.cookies?.auth_token;
  if (!token) throw new UnauthorizedException('No auth token found');

  try {
    const payload: any = jwt.verify(token, process.env.JWT_SECRET || 'ThISISJWTSECRETTOKENFORBLOGAPP');
    const user = await userRepo.findById(payload.sub);
    if (!user) throw new UnauthorizedException('User not found');
    return user;
  } catch (err) {
    throw new UnauthorizedException('Invalid or expired token');
  }
}
