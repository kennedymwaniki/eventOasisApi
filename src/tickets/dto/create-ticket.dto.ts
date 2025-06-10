import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { TicketStatus } from '../enum/ticketStatusEnum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTicketDto {
  @ApiProperty({
    description: 'Unique identifier for the ticket',
    example: 'TICKET-12345',
    required: true,
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  ticketNumber: string;

  @ApiProperty({
    description: 'ID of the event associated with the ticket',
    example: 1,
    required: true,
    type: Number,
  })
  @IsInt()
  @IsNotEmpty()
  eventId: number;

  @ApiProperty({
    description: 'ID of the user who purchased the ticket',
    example: 1,
    required: true,
    type: Number,
  })
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    description: 'ID of the payment associated with the ticket',
    example: 1,
    required: false,
    type: Number,
  })
  @IsInt()
  @IsOptional()
  paymentId?: number;

  @IsInt()
  @ApiProperty({
    description: 'ID of the event registration associated with the ticket',
    example: 1,
    required: true,
    type: Number,
  })
  @IsNotEmpty()
  eventRegistrationId: number;

  @IsEnum(TicketStatus)
  @ApiProperty({
    description: 'Status of the ticket',
    example: 'ACTIVE',
    required: false,
    enum: TicketStatus,
  })
  @IsOptional()
  status?: TicketStatus;
}
