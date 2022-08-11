import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { Model, Promise } from 'mongoose';
import { AddUserDto } from './dto/AddUser.dto';
import { CryptService } from '../services/crypt.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private cryptService: CryptService,
  ) {}

  async addUser(dto: AddUserDto) {
    const user = await this.userModel.create({ ...dto });
    user.password = await this.cryptService.hashPassword(user.password);
    user.save();
    return user;
  }

  findUserById(id: string) {
    return this.userModel.findById(id);
  }

  async findUserByEmailOrName(nameOrEmail: string) {
    const [userByName, userByEmail] = await Promise.all([
      this.findUserByName(nameOrEmail),
      this.findUserByEmail(nameOrEmail),
    ]);
    if (!userByEmail && !userByName) {
      throw new BadRequestException(
        'Нет пользователя с таким именем или почтой',
      );
    }
    return userByName ?? userByEmail;
  }

  private findUserByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  private findUserByName(name: string) {
    return this.userModel.findOne({ username: name });
  }
}
