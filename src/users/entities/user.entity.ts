/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from '../enums/roleEnums';
import { Event } from 'src/events/entities/event.entity';
import { Feedback } from 'src/feedback/entities/feedback.entity';
import { EventRegistration } from 'src/event_registration/entities/event_registration.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  password!: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  phone!: string;

  @Column({ type: 'text', nullable: true, default: null })
  hashedRefreshToken?: string | null;

  @Column({
    type: 'enum',
    enum: UserRole,
    nullable: false,
    default: UserRole.USER,
  })
  role!: UserRole;

  @OneToMany(() => Event, (event) => event.user, {
    eager: true,
    cascade: true,
  })
  events: Event[];

  @OneToMany(() => Feedback, (feedback) => feedback.user, {
    eager: true,
  })
  feedbacks: Feedback[];

  @OneToMany(() => EventRegistration, (event) => event.user)
  eventRegistration: EventRegistration[];

  @CreateDateColumn() //! resolve this one
  created_at!: Timestamp;

  @UpdateDateColumn()
  updateed_at!: Timestamp;
}
