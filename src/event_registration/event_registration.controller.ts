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
} from '@nestjs/common';

import { UpdateEventDto } from 'src/events/dto/update-event.dto';

import { EventsRegistrationService } from './event_registration.service';
import { EventRegistration } from './entities/event_registration.entity';
import { CreateEventRegistrationDto } from './dto/create-event_registration.dto';

@Controller('eventsRegistration')
export class EventsRegistrationController {
  constructor(
    private readonly eventsRegistrationService: EventsRegistrationService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createEventDto: CreateEventRegistrationDto,
  ): Promise<EventRegistration> {
    //const user = await this.
    return await this.eventsRegistrationService.create(createEventDto);
  }

  @Get()
  async findAll(): Promise<EventRegistration[]> {
    return await this.eventsRegistrationService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<EventRegistration> {
    return await this.eventsRegistrationService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateEventDto: UpdateEventDto,
  ): Promise<EventRegistration> {
    return await this.eventsRegistrationService.update(id, updateEventDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return this.eventsRegistrationService.remove(+id);
  }
}
