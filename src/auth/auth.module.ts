import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { UsersModule } from 'src/users/users.module';
import { HashingProvider } from './providers/hashing.provider';
import { BcryptProvider } from './providers/bcrypt.provider';
@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: HashingProvider,
      useClass: BcryptProvider, // Use BcryptProvider as the implementation of HashingProvider
    },
  ],
  exports: [AuthService, HashingProvider],
  imports: [forwardRef(() => UsersModule)],
})
export class AuthModule {}
