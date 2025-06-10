import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateFeedbackDto {
  @ApiProperty({
    description: 'ID of the event for which feedback is being provided',
    example: 1,
    required: true,
    type: Number,
    minimum: 1,
  })
  @IsInt()
  eventId: number;

  @ApiProperty({
    description: 'ID of the user providing feedback',
    example: 1,
    required: true,
    type: Number,
    minimum: 1,
  })
  @IsInt()
  userId: number;

  @ApiProperty({
    description: 'Rating given by the user',
    example: 5,
    required: true,
    type: Number,
    minimum: 1,
    maximum: 5,
  })
  @IsInt()
  rating: number;

  @ApiProperty({
    description: 'Comments provided by the user',
    example: 'Great event!',
    required: true,
    type: String,
  })
  @IsString()
  comments: string;
}
