import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateEventDto {
  @IsString()
  event_name: string;

  @IsDateString()
  @IsNotEmpty()
  event_date: string;

  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  event_location: string;

  @IsString()
  @IsNotEmpty()
  event_description: string;

  @IsInt()
  @IsNotEmpty()
  userId: number;
}
