import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PaymentStatus } from '../../payments/enum/paymentEnum';

import { User } from 'src/users/entities/user.entity';
import { Event } from 'src/events/entities/event.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import { Ticket } from 'src/tickets/entities/ticket.entity';

@Entity()
export class EventRegistration {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.eventRegistration)
  user: User;

  @OneToMany(() => Ticket, (ticket) => ticket.registeredEvent)
  ticket: Ticket;

  @ManyToOne(() => Event, (event) => event.registration)
  event: Event;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  registrationDate: Date;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
    nullable: false,
  })
  paymentStatus: PaymentStatus;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  amount: number;

  @OneToMany(() => Payment, (payment) => payment.registeredEvent)
  payment: Payment;
}
