import { IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  text: string;

  picture: Express.Multer.File;
}
