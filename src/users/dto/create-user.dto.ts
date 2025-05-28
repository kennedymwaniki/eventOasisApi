import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRole } from '../enums/roleEnums';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  @MaxLength(100)
  email!: string;

  @IsNotEmpty()
  @IsEnum(UserRole)
  role!: UserRole;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message:
      'Password needs a minimum of 8 characters, at least one letter, one number and one special character',
  })
  password!: string;

  @IsString()
  @IsNotEmpty()
  phone!: string;
}
