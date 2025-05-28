import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { loginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

async loginUser(loginUserDto: loginUserDto){
  const user = await this.usersService.findByEmail(loginUserDto.email);
  if (!user) {
    throw new UnauthorizedException('Invalid credentials');
  }

  const match = await bcrypt.compare(loginUserDto.userPass, user.userPass)
  if (!match) {
    throw new UnauthorizedException('Invalid credentials');
  }

  const payload = {
    sub: user.userId,
    email: user.email,
    role: user.role,
  };

  const token = await this.jwtService.signAsync(payload);

  return {
    access: token,
    user: {
      id: user.userId,
      email: user.email,
      role: user.role,
    },
  };
}
}
