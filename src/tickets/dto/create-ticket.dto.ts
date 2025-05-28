import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { TicketStatus } from '../enum/ticketStatusEnum';

export class CreateTicketDto {
  @IsString()
  @IsOptional()
  ticketNumber?: string; // Can be auto-generated if not provided

  @IsInt()
  @IsNotEmpty()
  eventId: number;

  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsOptional()
  paymentId?: number;

  @IsInt()
  @IsNotEmpty()
  eventRegistrationId: number;

  @IsEnum(TicketStatus)
  @IsOptional()
  status?: TicketStatus;
}
