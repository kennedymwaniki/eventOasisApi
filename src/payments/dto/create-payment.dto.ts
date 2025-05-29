import { IsDateString, IsEnum, IsInt } from 'class-validator';
import { PaymentMethod } from '../enum/paymentEnum';

export class CreatePaymentDto {
  @IsInt()
  registrationId: number;

  @IsDateString()
  payment_date: string;

  @IsInt()
  amount: number;

  @IsEnum(PaymentMethod)
  payment_method: PaymentMethod;
}
