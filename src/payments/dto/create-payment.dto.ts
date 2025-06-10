import { IsDateString, IsEnum, IsInt, IsString } from 'class-validator';
import { PaymentMethod, PaymentStatus } from '../enum/paymentEnum';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty({
    description: 'ID of the event registration associated with this payment',
    example: 1,
    required: true,
    type: Number,
  })
  @IsInt()
  registrationId: number;

  @ApiProperty({
    description: 'Date of the payment',
    example: '2023-09-15',
    required: true,
    type: String,
  })
  @IsDateString()
  payment_date: string;

  @ApiProperty({
    description: 'Amount of the payment',
    example: 100,
    required: true,
    type: Number,
  })
  @IsInt()
  amount: number;

  @IsString()
  @ApiProperty({
    description: 'Transaction ID of the payment',
    example: 'txn_123456',
    required: true,
    type: String,
  })
  transaction_id: string;

  @ApiProperty({
    description: 'Method of payment',
    example: 'CREDIT_CARD',
    required: true,
    type: String,
  })
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @ApiProperty({
    description: 'Status of the payment',
    example: 'COMPLETED',
    required: true,
    type: String,
  })
  @IsEnum(PaymentStatus)
  paymentstatus: PaymentStatus;
}
