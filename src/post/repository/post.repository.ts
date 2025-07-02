export abstract class PostRepository {
//   abstract findByEmail(email: string): Promise<any | null>;
  abstract create(user: {
    content: string;
    userId: string;
  }): Promise<any>;
  abstract findById(id: string): Promise<any | null>;
}
