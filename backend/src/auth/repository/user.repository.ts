export abstract class UserRepository {
  abstract findByEmail(email: string): Promise<any | null>;
  abstract create(user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }): Promise<any>;
  abstract findById(id: string): Promise<any | null>;
}
