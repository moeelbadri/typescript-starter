import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as argon2 from "argon2";
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,private readonly jwtService: JwtService) {}
  async signUp(email: string, password: string) {
    const users = await this.usersService.find(email);
    
    if (users.length) {
      throw new BadRequestException('email in use');
    }

    const hash = await argon2.hash(password, {
      type: argon2.argon2id,
    });

    const user = await this.usersService.create(email, hash);
    return user
  }

  async signIn(email: string, password: string) {
    const user = await this.usersService.find(email);
    if (user.length) {
      const match = await argon2.verify(user[0].password, password);
      if (match) {
        return this.jwtService.sign({ email });
      } else {
        throw new BadRequestException('bad password');
      }
    } else {
      throw new BadRequestException('user not found');
    }
  }
    
}
