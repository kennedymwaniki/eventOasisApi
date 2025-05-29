import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feedback } from './entities/feedback.entity';

import { UsersService } from 'src/users/users.service';
import { EventsService } from 'src/events/events.service';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private readonly feedbackRepository: Repository<Feedback>,

    private readonly userService: UsersService,
    private readonly eventService: EventsService,
  ) {}

  async create(createFeedbackDto: CreateFeedbackDto): Promise<Feedback> {
    const user = await this.userService.findOne(createFeedbackDto.userId);
    const event = await this.eventService.findOne(createFeedbackDto.eventId);

    if (!event) {
      throw new BadRequestException(
        `We could not find an event of the id ${createFeedbackDto.eventId} in our db`,
      );
    }

    if (!user) {
      throw new BadRequestException(
        `User with id ${createFeedbackDto.userId} not found on the database`,
      );
    }

    const newFeedback = this.feedbackRepository.create({
      ...createFeedbackDto,
      user: user,
      event: event,
    });

    return this.feedbackRepository.save(newFeedback);
  }

  async findAll() {
    return await this.feedbackRepository.find({
      relations: ['event', 'user'],
    });
  }

  async findOne(id: number) {
    return await this.feedbackRepository.findOne({
      where: { id },
      relations: ['event', 'user'],
    });
  }

  async update(id: number, updateFeedbackDto: UpdateFeedbackDto) {
    const feedback = this.feedbackRepository.create(updateFeedbackDto);
    if (!feedback) {
      throw new BadRequestException(`Feedback with id ${id} not found`);
    }
    return await this.feedbackRepository.update(id, feedback);
  }

  remove(id: number) {
    return `This action removes a #${id} feedback`;
  }
}
