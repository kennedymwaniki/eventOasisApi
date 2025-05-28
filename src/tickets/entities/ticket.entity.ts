/* eslint-disable @typescript-eslint/no-unused-vars */
import { EventRegistration } from 'src/event_registration/entities/event_registration.entity';
import { Event } from 'src/events/entities/event.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TicketStatus } from '../enum/ticketStatusEnum';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  ticketNumber: string;

  @ManyToOne(() => Event)
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @Column()
  eventId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  userId: number;

  // @ManyToOne(() => Payment, { nullable: true })
  // @JoinColumn({ name: 'payment_id' })
  // payment: Payment;

  @Column({ nullable: true })
  paymentId: number;

  // @ManyToOne(() => EventRegistration)
  // eventRegistration: EventRegistration;

  @Column()
  eventRegistrationId: number;

  @Column({ type: 'enum', enum: TicketStatus, default: TicketStatus.VALID })
  status: TicketStatus;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  issuedAt: Date;

  @Column({ nullable: true })
  usedAt: Date;
}
