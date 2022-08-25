import {
  Body,
  Controller,
  Put,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { UsersService } from './users.service';
import { CurrentUser } from '../decorators/user.decorator';
import { User } from '../schemas/user.schema';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Put()
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'avatarPicture', maxCount: 1 }]),
  )
  updateUser(
    @Body() dto: UpdateUserDto,
    @CurrentUser() user: User,
    @UploadedFiles()
    files: {
      avatarPicture?: Express.Multer.File[];
    },
  ) {
    dto.avatarImage = files.avatarPicture[0];
    return this.usersService.updateUser(dto, user);
  }
}
