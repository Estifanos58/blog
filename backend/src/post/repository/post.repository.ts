export abstract class PostRepository {
  //   abstract findByEmail(email: string): Promise<any | null>;
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
    content: string,
    title: string,
    image: string,
    description: string,
  ): Promise<any>;
  abstract deleteById(postId: string, userId: string): Promise<boolean>;
}
