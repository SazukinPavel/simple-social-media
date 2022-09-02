import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Put,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { UsersService } from './users.service';
import { CurrentUser } from '../decorators/user.decorator';
import { User } from '../schemas/user.schema';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Put()
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'avatarPicture', maxCount: 1 }]),
  )
  @UseGuards(AuthGuard)
  updateUser(
    @Body() dto: UpdateUserDto,
    @CurrentUser() user: User,
    @UploadedFiles()
    files: {
      avatarPicture?: Express.Multer.File[];
    },
  ) {
    if (files.avatarPicture && files.avatarPicture[0]) {
      dto.avatarImage = files.avatarPicture[0];
    }
    return this.usersService.updateUser(dto, user);
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.usersService.findUserById(id);
  }
}
