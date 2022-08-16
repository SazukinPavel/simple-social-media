import { Injectable } from '@nestjs/common';
import { genSalt, hash, compare } from 'bcryptjs';

@Injectable()
export class CryptService {
  async hashPassword(password: string) {
    const salt = parseInt(process.env.PASSWORD_SALT);
    return hash(password, await genSalt(salt));
  }

  comparePasswords(hashPassword: string, password: string) {
    return compare(password, hashPassword);
  }
}
