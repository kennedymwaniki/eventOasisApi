import { Injectable } from '@nestjs/common';
import { CreateEventRegistrationDto } from './dto/create-event_registration.dto';
import { UpdateEventRegistrationDto } from './dto/update-event_registration.dto';

@Injectable()
export class EventRegistrationService {
  create(createEventRegistrationDto: CreateEventRegistrationDto) {
    return 'This action adds a new eventRegistration';
  }

  findAll() {
    return `This action returns all eventRegistration`;
  }

  findOne(id: number) {
    return `This action returns a #${id} eventRegistration`;
  }

  update(id: number, updateEventRegistrationDto: UpdateEventRegistrationDto) {
    return `This action updates a #${id} eventRegistration`;
  }

  remove(id: number) {
    return `This action removes a #${id} eventRegistration`;
  }
}
