import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { AddUserDto } from './dto/AddUser.dto';
import { CryptService } from '../services/crypt.service';
import { Model } from 'mongoose';
import { LoginDto } from '../auth/dto/Login.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { FilesService } from '../files/files.service';
import { FileType } from '../types/FileType';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private cryptService: CryptService,
    private fileService: FilesService,
  ) {}

  async addUser(dto: AddUserDto) {
    const user = await this.userModel.create({ ...dto });
    user.password = await this.cryptService.hashPassword(dto.password);
    user.save();
    return user;
  }

  getAll() {
    return this.userModel.find();
  }

  findUserById(id: string) {
    return this.userModel.findById(id);
  }

  findUserByIdWithPosts(id: string) {
    return this.userModel.findById(id).populate('posts');
  }

  async findByIdOrThrowExeption(id: string) {
    const user = await this.findUserById(id);
    if (!user) {
      throw new BadRequestException('This user does not exist');
    }
    return user;
  }

  findUserByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async updateUser({ avatarImage, bio }: UpdateUserDto, user: User) {
    bio = bio || '';
    if (avatarImage) {
      const avatarPicturePath = await this.fileService.saveFile(
        FileType.IMAGE,
        avatarImage,
      );
      await this.userModel.findByIdAndUpdate(user._id, {
        bio,
        avatarPicture: avatarPicturePath,
      });
      user.avatarPicture = avatarPicturePath;
    } else {
      await this.userModel.findByIdAndUpdate(user._id, { bio });
    }
    user.bio = bio;
    return user;
  }

  findUserByName(name: string) {
    return this.userModel.findOne({ username: name });
  }

  async validateUser({ password, emailOrName }: LoginDto) {
    const [userByName, userByEmail] = await Promise.all([
      this.userModel.findOne({ username: emailOrName }).select('+password'),
      this.userModel.findOne({ email: emailOrName }).select('+password'),
    ]);
    if (!userByName && !userByEmail) {
      throw new BadRequestException(
        'There is no user with this name or email ',
      );
    }
    const user = userByName ?? userByEmail;
    const isPasswordEqual = await this.cryptService.comparePasswords(
      user.password,
      password,
    );
    if (!isPasswordEqual) {
      throw new BadRequestException('Wrong password!');
    }
    return user;
  }
}
