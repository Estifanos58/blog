import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../commands/create-user.command';
import { UserRepository } from '../repository/user.repository';
import * as bcrypt from 'bcrypt';
import { BadRequestException } from '@nestjs/common';
import { randomUUID } from 'crypto';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(command: CreateUserCommand): Promise<any> {
    const { firstName, lastName, email, password } = command;

    const existingUser = await this.userRepo.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      id: randomUUID(),
      firstName,
      lastName,
      email,
      password: hashedPassword,
    };

    return await this.userRepo.create(user);
  }
}
