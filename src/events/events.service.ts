import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,

    private readonly userService: UsersService,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const user = await this.userService.findOne(createEventDto.userId);
    if (!user) {
      throw new NotFoundException(
        `User with ID ${createEventDto.userId} not found`,
      );
    }
    const newEvent = this.eventsRepository.create({
      ...createEventDto,
      user: user,
    });

    return this.eventsRepository.save(newEvent);
  }

  async findAll(): Promise<Event[]> {
    return this.eventsRepository.find({
      relations: ['user', 'feedbacks', 'registration'],
    });
  }

  async findOne(id: number): Promise<Event> {
    const event = await this.eventsRepository.findOne({
      where: { id },
      relations: ['user', 'feedbacks', 'registration'],
    });

    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    return event;
  }

  async update(id: number, updateEventDto: UpdateEventDto): Promise<Event> {
    const event = await this.eventsRepository.findOne({
      where: { id },
    });
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    await this.eventsRepository.update(id, updateEventDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.eventsRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
  }
}
