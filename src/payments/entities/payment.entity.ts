import { ApiProperty } from '@nestjs/swagger';
import { EventRegistration } from 'src/event_registration/entities/event_registration.entity';
import { PaymentMethod, PaymentStatus } from 'src/payments/enum/paymentEnum';
import {
  Column,
  Entity,
  ManyToOne,
  // OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Payment {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => EventRegistration,
    (eventRegistration) => eventRegistration.payment,
  )
  registeredEvent: EventRegistration;

  @ApiProperty()
  @Column()
  amount: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  payment_date: string;

  @Column()
  transaction_id: string;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING, // Default status can be set to PENDING or any other initial status
  })
  paymentstatus: PaymentStatus;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: PaymentMethod,
    nullable: true,
    default: PaymentMethod.MPESA,
  })
  paymentMethod?: PaymentMethod; // Optional field for payment method (e.g., 'Credit Card', 'PayPal', etc.)
}
