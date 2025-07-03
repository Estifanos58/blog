// app/handlers/get-user-by-id.handler.ts
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserByIdQuery } from '../queries/get-user-id.query';
import { UserRepository } from '../repository/user.repository';
import { NotFoundException } from '@nestjs/common';
import { getUserFromRequest } from 'src/utils/get-user-from-request';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(query: GetUserByIdQuery): Promise<any> {
    const { req } = query;
    const currentUser = await getUserFromRequest(req , this.userRepo);

    const { password, ...rest } = currentUser;
    return rest;
  }

}
