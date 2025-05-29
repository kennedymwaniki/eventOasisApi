import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Repository } from 'typeorm';
import { EventsRegistrationService } from 'src/event_registration/event_registration.service';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,

    private readonly registeredEventService: EventsRegistrationService,
  ) {}

  async create(createPaymentDto: CreatePaymentDto) {
    const registeredEvent = await this.registeredEventService.findOne(
      createPaymentDto.registrationId,
    );

    if (!registeredEvent) {
      throw new BadRequestException(
        `Sorry but we dont have any record of any event of the id ${createPaymentDto.registrationId}`,
      );
    }

    const newPayment = this.paymentRepository.create({
      ...CreatePaymentDto,
      registeredEvent: registeredEvent,
    });
    return this.paymentRepository.save(newPayment);
  }

  async findAll() {
    return await this.paymentRepository.find();
  }

  async findOne(id: number) {
    const payment = await this.paymentRepository.findOne({
      where: { id },
    });
    if (!payment) {
      throw new NotFoundException(
        `No such payment exists in our records of id ${id}`,
      );
    }
    return payment;
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    const payment = await this.paymentRepository.findOne({
      where: { id },
    });
    if (!payment) {
      throw new NotFoundException(
        `No such payment exists in our records of id ${id}`,
      );
    }
    return await this.paymentRepository.update(id, updatePaymentDto);
  }

  async remove(id: number) {
    const result = await this.paymentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
  }
}
