import { IsString } from 'class-validator';

export class UpdatePostDto {
  @IsString()
  text: string;

  @IsString()
  postId:string
}
