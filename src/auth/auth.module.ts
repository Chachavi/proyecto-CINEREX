import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [PassportModule, JwtModule.register({
    secret: process.env.JWT_SECRET || 'jwt-secret',
  signOptions: { expiresIn: '1h'},
  }),
  UsersModule,
],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
