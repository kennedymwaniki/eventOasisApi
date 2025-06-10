import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateEventDto {
  @ApiProperty({
    description: 'Name of the event',
    example: 'Tech Conference 2023',
    required: true,
    type: String,
    maxLength: 100,
  })
  @IsString()
  event_name: string;

  @ApiProperty({
    description: 'Date of the event',
    example: '2023-09-15',
    required: true,
    type: String,
  })
  @IsDateString()
  @IsNotEmpty()
  event_date: string;

  @IsString()
  @ApiProperty({
    description: 'Location of the event',
    example: 'New York City',
    required: true,
    type: String,
    maxLength: 100,
  })
  @MaxLength(100)
  @IsNotEmpty()
  event_location: string;

  @IsString()
  @ApiProperty({
    description: 'Description of the event',
    example: 'An annual tech conference',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  event_description: string;

  @ApiProperty({
    description: 'ID of the user creating the event',
    example: 1,
    required: true,
    type: Number,
  })
  @IsInt()
  @IsNotEmpty()
  userId: number;
}
