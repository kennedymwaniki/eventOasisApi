/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PaymentStatus } from '../enum/paymentEnum';
import { Ticket } from 'src/tickets/entities/ticket.entity';
import { User } from 'src/users/entities/user.entity';
import { Event } from 'src/events/entities/event.entity';

@Entity()
export class EventRegistration {
  @PrimaryGeneratedColumn()
  id: number;

  // @OneToMany(() => User, (user) => user.eventRegistration)
  // user: User;

  // @OneToMany(() => Ticket, (ticket) => ticket.eventRegistration)
  // ticket: Ticket;

  // @OneToMany(() => Event, (event) => event.registration)
  // event: Event;

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
  PaymentAmount: number;
}
