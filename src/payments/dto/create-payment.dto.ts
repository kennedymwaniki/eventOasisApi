import { IsDateString, IsEnum, IsInt, IsString } from 'class-validator';
import { PaymentMethod, PaymentStatus } from '../enum/paymentEnum';
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

  @IsString()
  @ApiProperty()
  transaction_id: string;

  @ApiProperty()
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @ApiProperty()
  @IsEnum(PaymentStatus)
  paymentstatus: PaymentStatus;
}
