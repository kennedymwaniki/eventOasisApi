import { Module } from '@nestjs/common';
import { EventRegistrationService } from './event_registration.service';
import { EventRegistrationController } from './event_registration.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventRegistration } from './entities/event_registration.entity';

@Module({
  controllers: [EventRegistrationController],
  providers: [EventRegistrationService],
  imports: [TypeOrmModule.forFeature([EventRegistration])], // Add your entities here
})
export class EventRegistrationModule {}
