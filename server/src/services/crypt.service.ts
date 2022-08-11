import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcryptjs';

@Injectable()
export class CryptService {
  hashPassword(password: string) {
    return hash(password, process.env.PASSWORD_SECRET_KEY);
  }

  comparePasswords(hashPassword: string, password: string) {
    return compare(password, hashPassword);
  }
}
