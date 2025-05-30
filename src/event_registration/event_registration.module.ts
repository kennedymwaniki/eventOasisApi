import { UsersModule } from 'src/users/users.module';
import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { EventRegistration } from './entities/event_registration.entity';
import { EventsRegistrationService } from './event_registration.service';
import { EventsRegistrationController } from './event_registration.controller';
import { EventsModule } from 'src/events/events.module';

@Module({
  controllers: [EventsRegistrationController],
  providers: [EventsRegistrationService],
  exports: [EventsRegistrationService],

  imports: [
    UsersModule,
    EventsModule,
    TypeOrmModule.forFeature([EventRegistration]),
  ],
})
export class EventRegistrationModule {}
