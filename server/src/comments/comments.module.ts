import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule } from 'src/posts/posts.module';
import { CommentSchema } from 'src/schemas/comment.schema';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { Comment } from 'src/schemas/comment.schema';

@Module({
  imports: [
    PostsModule,
    MongooseModule.forFeature([{name:Comment.name,schema:CommentSchema}])
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
