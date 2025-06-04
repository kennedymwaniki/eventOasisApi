import { PartialType } from '@nestjs/mapped-types';
import { CreateTicketDto } from './create-ticket.dto';
import { IsInt } from 'class-validator';

export class UpdateTicketDto extends PartialType(CreateTicketDto) {
  @IsInt()
  id: number; // Ensure that the id is provided for updates
}
