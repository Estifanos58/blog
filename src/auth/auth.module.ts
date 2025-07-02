import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthController } from './controllers/auth.controller';
import { CreateUserHandler } from '../auth/handlers/create-user-handler'; // ✅ import
import { DatabaseService } from 'src/database/database.service';
import { UserRepository } from './repository/user.repository';
import { UserRepositoryImpl } from './repository/user.repository.impl';
import { LoginUserHandler } from './handlers/login-user-handler';
import { GetUserByIdHandler } from './handlers/get-user-id-handler';

const CommandHandlers = [CreateUserHandler, LoginUserHandler]; 
const QueryHandlers = [GetUserByIdHandler];


@Module({
  imports: [CqrsModule],
  controllers: [AuthController],
  providers: [
    ...CommandHandlers, 
    ...QueryHandlers,
    DatabaseService,
    {
      provide: UserRepository,
      useClass: UserRepositoryImpl,
    },
  ],
})
export class AuthModule {}
