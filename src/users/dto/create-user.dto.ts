import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRole } from '../enums/roleEnums';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty()
  @IsEmail()
  @MaxLength(100)
  email!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(UserRole)
  role!: UserRole;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message:
      'Password needs a minimum of 8 characters, at least one letter, one number and one special character',
  })
  password!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phone!: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  otp?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  secret?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  hashedRefreshToken?: string | null;
}
