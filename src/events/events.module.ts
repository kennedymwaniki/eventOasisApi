import { UsersModule } from './../users/users.module';
import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { PaginationModule } from 'src/pagination/pagination.module';
import { RolesGuard } from 'src/auth/guards/RoleGuard';
// import { PaginationProvider } from 'src/config/pagination/providers/pagination.provider';

@Module({
  controllers: [EventsController],
  providers: [EventsService, RolesGuard],
  exports: [EventsService], // Export the service if needed in other modules
  imports: [UsersModule, PaginationModule, TypeOrmModule.forFeature([Event])], // Add your Event entity here
})
export class EventsModule {}
