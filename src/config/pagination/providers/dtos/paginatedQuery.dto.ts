import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class PaginatedQueryDto {
  @IsPositive()
  @IsOptional()
  limit?: number;

  @IsPositive()
  @IsOptional()
  page?: number;
}
