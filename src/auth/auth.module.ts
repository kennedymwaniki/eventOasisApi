import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AccesstokenStrategy } from './strategies/Accesstoke.strategy';
import { Refreshtokenstrategy } from './strategies/Refreshtokenstrategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AccesstokenStrategy, Refreshtokenstrategy],
  exports: [AuthService],
  imports: [
    UsersModule,
    ConfigModule,
    PassportModule,
    JwtModule.register({
      global: true,
    }),
  ],
})
export class AuthModule {}
