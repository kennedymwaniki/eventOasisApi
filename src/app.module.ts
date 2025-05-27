import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { FeedbackModule } from './feedback/feedback.module';
import { EventRegistrationModule } from './event_registration/event_registration.module';
import { PaymentsModule } from './payments/payments.module';
import { TicketsModule } from './tickets/tickets.module';
import { EventRegistrationsModule } from './event_registrations/event_registrations.module';

@Module({
  imports: [
    UsersModule,
    EventsModule,
    FeedbackModule,
    EventRegistrationModule,
    PaymentsModule,
    TicketsModule,
    EventRegistrationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
