import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { EventsRegistrationService } from 'src/event_registration/event_registration.service';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService],
  imports: [
    EventsRegistrationService,
    TypeOrmModule.forFeature([Payment]), // Uncomment and add your Payment entity here
  ],
})
export class PaymentsModule {}
