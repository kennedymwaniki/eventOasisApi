import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { EventRegistrationModule } from 'src/event_registration/event_registration.module';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService],
  imports: [
    EventRegistrationModule,
    TypeOrmModule.forFeature([Payment]), // Uncomment and add your Payment entity here
  ],
})
export class PaymentsModule {}
