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
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';

import { Public } from 'src/auth/decorators/public.decorator';
import { PaginatedQueryDto } from 'src/pagination/providers/dtos/paginatedQuery.dto';
import { Paginated } from 'src/pagination/providers/interfaces/paginated.interface';
import { Roles } from 'src/auth/decorators/role.decorator';
import { UserRole } from 'src/users/enums/roleEnums';
import { RolesGuard } from 'src/auth/guards/RoleGuard';
import { ApiTags } from '@nestjs/swagger';

@UseGuards(RolesGuard)
@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  // @Public()
  @Post()
  @Roles(UserRole.ADMIN, UserRole.ORGANIZER)
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createEventDto: CreateEventDto): Promise<Event> {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  @Public()
  async findAll(
    @Query() paginationQuery: PaginatedQueryDto,
  ): Promise<Paginated<Event>> {
    return this.eventsService.findAll(paginationQuery);
  }

  @Get(':id')
  @Public()
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Event> {
    return await this.eventsService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.ORGANIZER)
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: number,
    @Body() updateEventDto: UpdateEventDto,
  ): Promise<Event> {
    return this.eventsService.update(id, updateEventDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.ORGANIZER)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return this.eventsService.remove(+id);
  }
}
