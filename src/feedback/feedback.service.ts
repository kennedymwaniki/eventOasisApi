import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feedback } from './entities/feedback.entity';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private readonly feebackRepository: Repository<Feedback>,
  ) {}

  async create(createFeedbackDto: CreateFeedbackDto) {
    return await this.feebackRepository.save(createFeedbackDto);
  }

  findAll() {
    return `This action returns al`;
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
