import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user.schema';
import { CryptService } from '../services/crypt.service';
import { UsersController } from './users.controller';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    FilesModule,
  ],
  exports: [UsersService],
  providers: [UsersService, CryptService],
  controllers: [UsersController],
})
export class UsersModule {}
