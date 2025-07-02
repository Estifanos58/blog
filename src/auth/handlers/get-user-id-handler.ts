// app/handlers/get-user-by-id.handler.ts
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserByIdQuery } from '../queries/get-user-id.query';
import { UserRepository } from '../repository/user.repository';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(query: GetUserByIdQuery) {
    const user = await this.userRepo.findById(query.id);
    if (!user) throw new NotFoundException('User not found');

    // remove password from response
    const { password, ...rest } = user;
    return rest;
  }
}
