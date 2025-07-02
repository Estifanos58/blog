import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { UserRepository } from './user.repository';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly prisma: DatabaseService) {}

  async findByEmail(email: string): Promise<any | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async create(user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }): Promise<any> {
    return this.prisma.user.create({ data: user });
  }

  async findById(id: string): Promise<any | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }
}
