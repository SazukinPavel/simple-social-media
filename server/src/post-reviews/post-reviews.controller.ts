import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SetPostReviewDto } from './dto/SetPostReview.dto';
import { PostReviewsService } from './post-reviews.service';
import { CurrentUser } from '../decorators/user.decorator';
import { AuthGuard } from '../guards/auth.guard';
import { User } from '../schemas/user.schema';

@Controller('post-reviews')
@UseGuards(AuthGuard)
export class PostReviewsController {
  constructor(private postReviewsService: PostReviewsService) {}

  @Post()
  setPostReview(@Body() dto: SetPostReviewDto, @CurrentUser() user) {
    return this.postReviewsService.setPostReview(dto, user);
  }

  @Delete(':id')
  deletePostReview(@Param('id') id: string, @CurrentUser() user: User) {
    return this.postReviewsService.deleteReview(id, user);
  }
}
