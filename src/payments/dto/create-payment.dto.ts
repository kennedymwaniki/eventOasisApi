import { IsDateString, IsEnum, IsInt } from 'class-validator';
import { PaymentMethod } from '../enum/paymentEnum';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty()
  @IsInt()
  registrationId: number;

  @ApiProperty()
  @IsDateString()
  payment_date: string;

  @ApiProperty()
  @IsInt()
  amount: number;

  @ApiProperty()
  @IsEnum(PaymentMethod)
  payment_method: PaymentMethod;
}
