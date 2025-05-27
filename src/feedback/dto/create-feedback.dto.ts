import { IsInt, IsString } from 'class-validator';

export class CreateFeedbackDto {
  @IsInt()
  eventId: number;

  @IsInt()
  userId: number;

  @IsInt()
  rating: number;

  @IsString()
  comments: string;
}
