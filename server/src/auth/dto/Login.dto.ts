import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  emailOrName: string;
  @IsString()
  password: string;
}
