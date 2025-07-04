export abstract class PostRepository {
  abstract create(user: {
    content: string;
    title: string;
    image: string;
    description: string;
    userId: string;
  }): Promise<any>;
  abstract findById(id: string): Promise<any | null>;
  abstract findAll(): Promise<any[]>;
  abstract updateById(
    postId: string,
    userId: string,
    title: string,
    description: string,
    content: string,
  ): Promise<any>;
  abstract deleteById(postId: string, userId: string): Promise<boolean>;
}
