import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { UsersService } from 'src/users/users.service';
import { AuthController } from './auth.controller';
@Module({
  imports: [JwtModule.register({ global: true,secret: 'hard!to-guess_secret' }),UsersService],
  providers: [AuthService],
  controllers: [AuthController],
  })
export class AuthModule {}