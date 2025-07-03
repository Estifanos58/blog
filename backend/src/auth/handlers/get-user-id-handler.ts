
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserByIdQuery } from '../queries/get-user-id.query';
import { UserRepository } from '../repository/user.repository';
import { getUserFromRequest } from 'src/utils/get-user-from-request';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
  constructor(private readonly userRepo: UserRepository) {}

  // for the endpoint (GET /auth/me) to authenticate the user and retrieve their profile information,
  async execute(query: GetUserByIdQuery): Promise<any> {
    const { req } = query;
    const currentUser = await getUserFromRequest(req , this.userRepo);

    const { password, ...rest } = currentUser;
    return rest;
  }

}
