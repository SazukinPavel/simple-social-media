import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../decorators/user.decorator';
import { User } from '../schemas/user.schema';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/CreatePost.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('posts')
@UseGuards(AuthGuard)
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  getAll(@CurrentUser() user: User) {
    return this.postsService.getPosts(user);
  }

  @Get('me')
  getUserPosts(@CurrentUser() user) {
    return this.postsService.getUserPosts(user._id);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.postsService.findById(id);
  }

  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'picture', maxCount: 1 }]))
  addPost(
    @UploadedFiles()
    files: {
      picture?: Express.Multer.File[];
    },
    @Body() dto: CreatePostDto,
    @CurrentUser() user: User,
  ) {
    dto.picture = files.picture[0];
    return this.postsService.create(dto, user);
  }
}
