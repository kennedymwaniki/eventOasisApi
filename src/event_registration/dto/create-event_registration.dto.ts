import { IsDate, IsEnum, IsInt } from 'class-validator';

export class CreateEventRegistrationDto {
  @IsInt()
  eventId: number;
  @IsInt()
  userId: number;
  @IsDate()
  registrationDate: Date;

  @IsEnum(['PENDING', 'CONFIRMED', 'CANCELLED'])
  payementStatus: 'PENDING' | 'CONFIRMED' | 'CANCELLED';

  amount: number;
}
