import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { SessionsModule } from './sessions/sessions.module';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { JwtService } from './services';
import { PostReviewsModule } from './post-reviews/post-reviews.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    AuthModule,
    PostsModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_CONNECTION_STRING),
    UsersModule,
    SessionsModule,
    PostReviewsModule,
    FilesModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'static'),
    }),
    CommentsModule
  ],
  controllers: [],
  providers: [JwtService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
