import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PostController } from './controllers/post.controller';
import { CreatePostHandler } from './handlers/create-post.handler';
import { DatabaseService } from 'src/database/database.service';
import { PostRepository } from './repository/post.repository';
import { PostRepositoryImpl } from './repository/post.repository.impl';
import { AuthModule } from 'src/auth/auth.module';
import { GetAllPostsHandler } from './handlers/get-all-posts.handler';
import { UpdatePostHandler } from './handlers/update-post.handler';
import { DeletePostHandler } from './handlers/delete-post.handler';

const CommandHandlers = [CreatePostHandler, UpdatePostHandler, DeletePostHandler];
const QueryHandlers = [GetAllPostsHandler]; 

@Module({
    imports: [CqrsModule, AuthModule],
    controllers: [PostController],
    providers: [
        ...CommandHandlers,
        ...QueryHandlers,
        DatabaseService,
        {
            provide: PostRepository,
            useClass: PostRepositoryImpl
        }
    ],
    exports: [PostRepository]
})
export class PostModule {}
