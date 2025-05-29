import { EventRegistration } from 'src/event_registration/entities/event_registration.entity';
import { PaymentStatus } from 'src/payments/enum/paymentEnum';
import {
  Column,
  Entity,
  ManyToOne,
  // OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => EventRegistration,
    (eventRegistration) => eventRegistration.payment,
  )
  registeredEvent: EventRegistration;

  @Column()
  amount: number;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING, // Default status can be set to PENDING or any other initial status
  })
  paymentstatus: PaymentStatus;
}
