import { Body, Controller, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { UsersService } from './users.service';
import { CurrentUser } from '../decorators/user.decorator';
import { User } from '../schemas/user.schema';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Put()
  updateUser(@Body() dto: UpdateUserDto, @CurrentUser() user: User) {
    return this.usersService.updateUser(dto, user);
  }
}
