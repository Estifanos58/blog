import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { PostRepository } from './post.repository';

@Injectable()
export class PostRepositoryImpl implements PostRepository {
  constructor(private readonly prisma: DatabaseService) {}

  async create(post: { content: string; title:string; description:string; image:string; userId: string }): Promise<any> {
    return this.prisma.post.create({ data: post });
  }

  async findById(id: string): Promise<any | null> {
    return this.prisma.post.findUnique({ where: { id } });
  }

  async findAll(): Promise<any[]> {
    return this.prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
        comments: true,
      },
    });
  }
  async updateById(
    postId: string,
    userId: string,
    title: string,
    description: string,
    content: string,
  ): Promise<any> {
    const post = await this.prisma.post.findUnique({ where: { id: postId } });
    if (!post || post.userId !== userId) return null;

    return this.prisma.post.update({
      where: { id: postId },
      data: {  title, description, content },
    });
  }

  async deleteById(postId: string, userId: string): Promise<boolean> {
  const post = await this.prisma.post.findUnique({ where: { id: postId } });
  if (!post || post.userId !== userId) return false;

  await this.prisma.post.delete({ where: { id: postId } });
  return true;
}
}
