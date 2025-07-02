// app/repository/comment.repository.ts
export abstract class CommentRepository {
  abstract create(data: {
    userId: string;
    postId: string;
    content: string;
  }): Promise<any>;

   abstract updateById(commentId: string, userId: string, content: string): Promise<any | null>;

   abstract deleteById(commentId: string, userId: string): Promise<boolean>;
}
