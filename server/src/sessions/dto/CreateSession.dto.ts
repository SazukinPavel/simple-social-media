import { User } from '../../schemas/user.schema';

export class CreateSessionDto {
  user: User;
  refreshToken: string;
}
