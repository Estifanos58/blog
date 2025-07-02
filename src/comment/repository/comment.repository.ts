// app/repository/comment.repository.ts
export abstract class CommentRepository {
  abstract create(data: {
    userId: string;
    postId: string;
    content: string;
  }): Promise<any>;
}
