import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateEventDto {
  @IsString()
  event_name: string;

  @IsDate()
  @IsNotEmpty()
  event_date: Date;

  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  event_location: string;

  @IsString()
  @IsNotEmpty()
  event_description: string;

  @IsInt()
  @IsNotEmpty()
  created_by: number;
}
