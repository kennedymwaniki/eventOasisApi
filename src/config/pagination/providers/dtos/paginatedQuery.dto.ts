import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginatedQueryDto {
  @ApiPropertyOptional()
  @IsPositive()
  @IsOptional()
  limit?: number;

  @IsPositive()
  @IsOptional()
  page?: number;
}
