import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
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
import { UpdatePostDto } from './dto/UpdatePost.dto';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  getAll(@CurrentUser() user: User, @Query('user') userId: string) {
    if (userId) {
      return this.postsService.getUserPosts(userId);
    }
    return this.postsService.getPosts(user);
  }

  @Get('me')
  @UseGuards(AuthGuard)
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
    if (files.picture && files.picture[0]) {
      dto.picture = files.picture[0];
    }
    return this.postsService.create(dto, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deletePost(@Param('id') id: string, @CurrentUser() user) {
    return this.postsService.deletePost(id, user);
  }

  @Put()
  @UseGuards(AuthGuard)
  updatePost(@Body() dto:UpdatePostDto,@CurrentUser() user){
    return this.postsService.updatePost(dto,user)
  }
}
