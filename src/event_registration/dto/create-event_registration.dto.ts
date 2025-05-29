import { IsDateString, IsEnum, IsInt } from 'class-validator';
import { PaymentStatus } from 'src/payments/enum/paymentEnum';

export class CreateEventRegistrationDto {
  @IsInt()
  eventId: number;

  @IsInt()
  userId: number;

  @IsDateString()
  registrationDate: string;

  @IsEnum(PaymentStatus)
  paymentStatus: PaymentStatus;

  @IsInt()
  amount: number;
}
