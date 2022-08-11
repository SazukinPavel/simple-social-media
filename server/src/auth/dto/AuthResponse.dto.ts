import { User } from '../../schemas/user.schema';

export class AuthResponseDto {
  accessToken: string;
  user: User;
}
