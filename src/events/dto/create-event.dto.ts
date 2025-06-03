import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateEventDto {
  @ApiProperty()
  @IsString()
  event_name: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  event_date: string;

  @IsString()
  @ApiProperty()
  @MaxLength(100)
  @IsNotEmpty()
  event_location: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  event_description: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  userId: number;
}
