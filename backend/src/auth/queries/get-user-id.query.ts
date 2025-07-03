import { Request } from 'express';

export class GetUserByIdQuery {
  constructor( public readonly req: Request) {}
}
