import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsInt } from 'class-validator';
import { PaymentStatus } from 'src/payments/enum/paymentEnum';

export class CreateEventRegistrationDto {
  @ApiProperty({
    description: 'ID of the event to register for',
    example: 1,
    required: true,
    type: Number,
  })
  @IsInt()
  eventId: number;

  @ApiProperty({
    description: 'ID of the user registering for the event',
    example: 1,
    required: true,
    type: Number,
  })
  @IsInt()
  userId: number;

  @ApiProperty({
    description: 'Date when the user registered for the event',
  })
  @IsDateString()
  registrationDate: string;

  @ApiProperty({
    enum: PaymentStatus,
    description: 'Status of the payment for the event registration',
  })
  @IsEnum(PaymentStatus)
  paymentStatus: PaymentStatus;

  @ApiProperty()
  @IsInt()
  amount: number;
}
