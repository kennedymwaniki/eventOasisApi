import { IsDate, IsEnum, IsInt } from 'class-validator';
import { PaymentStatus } from 'src/payments/enum/paymentEnum';

export class CreateEventRegistrationDto {
  @IsInt()
  eventId: number;

  @IsInt()
  userId: number;

  @IsDate()
  registrationDate: Date;

  @IsEnum(PaymentStatus)
  paymentStatus: PaymentStatus;

  amount: number;
}
