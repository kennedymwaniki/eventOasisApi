import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UsersService } from 'src/users/users.service';
import { EventsService } from 'src/events/events.service';
import { EventRegistration } from './entities/event_registration.entity';

import { CreateEventRegistrationDto } from './dto/create-event_registration.dto';
import { UpdateEventRegistrationDto } from './dto/update-event_registration.dto';

@Injectable()
export class EventsRegistrationService {
  constructor(
    @InjectRepository(EventRegistration)
    private eventRegistrationRepository: Repository<EventRegistration>,
    private readonly userService: UsersService,
    private readonly eventsService: EventsService,
  ) {}

  async create(
    createEventRegistrationDto: CreateEventRegistrationDto,
  ): Promise<EventRegistration> {
    // Verify user exists
    const user = await this.userService.findOne(
      createEventRegistrationDto.userId,
    );
    if (!user) {
      throw new NotFoundException(
        `User with ID ${createEventRegistrationDto.userId} not found`,
      );
    }

    // Verify event exists
    const event = await this.eventsService.findOne(
      createEventRegistrationDto.eventId,
    );
    if (!event) {
      throw new NotFoundException(
        `Event with ID ${createEventRegistrationDto.eventId} not found`,
      );
    }

    const newRegistration = this.eventRegistrationRepository.create({
      ...createEventRegistrationDto,
      user: user,
      event: event,
    });

    return this.eventRegistrationRepository.save(newRegistration);
  }

  async findAll(): Promise<EventRegistration[]> {
    return this.eventRegistrationRepository.find({
      relations: ['user', 'event', 'payment', 'ticket'],
    });
  }

  async findOne(id: number): Promise<EventRegistration> {
    const registration = await this.eventRegistrationRepository.findOne({
      where: { id },
      relations: ['user', 'event', 'payment', 'ticket'],
    });

    if (!registration) {
      throw new NotFoundException(`Event registration with ID ${id} not found`);
    }

    return registration;
  }

  async update(
    id: number,
    updateEventRegistrationDto: UpdateEventRegistrationDto,
  ): Promise<EventRegistration> {
    const registration = await this.eventRegistrationRepository.findOne({
      where: { id },
    });
    if (!registration) {
      throw new NotFoundException(`Event registration with ID ${id} not found`);
    }

    await this.eventRegistrationRepository.update(
      id,
      updateEventRegistrationDto,
    );
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.eventRegistrationRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Event registration with ID ${id} not found`);
    }
  }
}
