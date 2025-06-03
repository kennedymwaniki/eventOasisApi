import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateFeedbackDto {
  @ApiProperty()
  @IsInt()
  eventId: number;

  @ApiProperty()
  @IsInt()
  userId: number;

  @ApiProperty()
  @IsInt()
  rating: number;

  @ApiProperty()
  @IsString()
  comments: string;
}
