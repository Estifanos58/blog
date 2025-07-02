import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PostController } from './controllers/post.controller';
import { CreatePostHandler } from './handlers/create-post.handler';
import { DatabaseService } from 'src/database/database.service';
import { PostRepository } from './repository/post.repository';
import { PostRepositoryImpl } from './repository/post.repository.impl';
import { AuthModule } from 'src/auth/auth.module';

const CommandHandlers = [CreatePostHandler,]

@Module({
    imports: [CqrsModule, AuthModule],
    controllers: [PostController],
    providers: [
        ...CommandHandlers,
        DatabaseService,
        {
            provide: PostRepository,
            useClass: PostRepositoryImpl
        }
    ]
})
export class PostModule {}
