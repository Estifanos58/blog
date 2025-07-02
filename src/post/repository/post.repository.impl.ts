import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { PostRepository } from './post.repository';

@Injectable()
export class PostRepositoryImpl implements PostRepository {
  constructor(private readonly prisma: DatabaseService) {}

//   async findByEmail(email: string): Promise<any | null> {
//     return this.prisma.user.findUnique({ where: { email } });
//   }

  async create(post: {
    content: string;
    userId: string;
  }): Promise<any> {
    return this.prisma.post.create({ data: post });
  }

  async findById(id: string): Promise<any | null> {
    return this.prisma.post.findUnique({ where: { id } });
  }
}
