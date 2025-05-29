import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feedback } from './entities/feedback.entity';

import { UsersService } from 'src/users/users.service';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private readonly feebackRepository: Repository<Feedback>,

    private readonly userService: UsersService,
  ) {}

  async create(createFeedbackDto: CreateFeedbackDto) {
    const user = await this.userService.findOne(createFeedbackDto.userId);

    if (!user) {
      throw new BadRequestException(
        `User with id ${createFeedbackDto.userId} not found on the database`,
      );
    }
    return await this.feebackRepository.save(createFeedbackDto);
  }

  async findAll() {
    return await this.feebackRepository.find({
      relations: ['event', 'user'],
    });
  }

  async findOne(id: number) {
    return await this.feebackRepository.findOne({
      where: { id },
      relations: ['event', 'user'],
    });
  }

  async update(id: number, updateFeedbackDto: UpdateFeedbackDto) {
    const feedback = this.feebackRepository.create(updateFeedbackDto);
    if (!feedback) {
      throw new BadRequestException(`Feedback with id ${id} not found`);
    }
    return await this.feebackRepository.update(id, feedback);
  }

  remove(id: number) {
    return `This action removes a #${id} feedback`;
  }
}
