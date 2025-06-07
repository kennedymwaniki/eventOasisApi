import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PaginationModule } from 'src/pagination/pagination.module';
// import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
  imports: [
    PaginationModule,
    // forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([User]),
  ],
})
export class UsersModule {}
