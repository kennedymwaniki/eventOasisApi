import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

import { Public } from 'src/auth/decorators/public.decorator';
import { PaginatedQueryDto } from 'src/pagination/providers/dtos/paginatedQuery.dto';
import { Paginated } from 'src/pagination/providers/interfaces/paginated.interface';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/RoleGuard';
import { Roles } from 'src/auth/decorators/role.decorator';
import { UserRole } from './enums/roleEnums';

@UseGuards(RolesGuard)
@Controller('users')
@ApiTags('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Public()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.ORGANIZER)
  @Roles(UserRole.ADMIN, UserRole.ORGANIZER, UserRole.USER)
  findAll(
    @Query() paginatedQuery: PaginatedQueryDto,
  ): Promise<Paginated<User>> {
    return this.usersService.findAll(paginatedQuery);
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.ORGANIZER, UserRole.USER)
  findOne(@Param('id') id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.ORGANIZER)
  update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: number): Promise<void> {
    return this.usersService.remove(id);
  }
}
