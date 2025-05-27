import { Module } from '@nestjs/common';
import { EventRegistrationService } from './event_registration.service';
import { EventRegistrationController } from './event_registration.controller';

@Module({
  controllers: [EventRegistrationController],
  providers: [EventRegistrationService],
})
export class EventRegistrationModule {}
