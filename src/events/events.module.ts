import { UsersModule } from './../users/users.module';
import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';

@Module({
  controllers: [EventsController],
  providers: [EventsService],
  exports: [EventsService], // Export the service if needed in other modules
  imports: [UsersModule, TypeOrmModule.forFeature([Event])], // Add your Event entity here
})
export class EventsModule {}
