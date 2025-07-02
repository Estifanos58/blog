import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllPostsQuery } from '../queries/get-all-posts.query';
import { PostRepository } from '../repository/post.repository';

@QueryHandler(GetAllPostsQuery)
export class GetAllPostsHandler implements IQueryHandler<GetAllPostsQuery> {
  constructor(private readonly postRepo: PostRepository) {}

  async execute(query: GetAllPostsQuery) {
    return this.postRepo.findAll();
  }
}
