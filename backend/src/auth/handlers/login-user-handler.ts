// app/handlers/login-user.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoginUserCommand } from '../commands/login-user.command';
import { UserRepository } from '../repository/user.repository';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { first } from 'rxjs';

@CommandHandler(LoginUserCommand)
export class LoginUserHandler implements ICommandHandler<LoginUserCommand> {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(command: LoginUserCommand): Promise<any> {
    const { email, password } = command;

    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    return { id: user.id, email: user.email ,firstName: user.firstName, lastName: user.lastName };
  }
}
