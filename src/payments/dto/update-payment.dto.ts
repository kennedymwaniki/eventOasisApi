import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentDto } from './create-payment.dto';
import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {
  @IsInt()
  @IsNotEmpty()
  id: number; // Ensure that the id is provided for updates
}
