import { Body, Controller, Get, Param, Post, Res, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/decorators/user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from 'src/schemas/user.schema';
import { CommentsService } from './comments.service';
import AddCommentDto from './dto/AddComment.dto';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService:CommentsService){}

    @Get(':postId')
    getCommentsByPostId(@Param() postId:string){
        return this.commentsService.findByPostId(postId)
    }

    @Post()
    @UseGuards(AuthGuard)
    addComment(@Body() dto:AddCommentDto,@CurrentUser() user:User){
        return this.commentsService.addComment(dto,user)
    }
}
