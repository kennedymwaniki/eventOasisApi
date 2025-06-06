/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { EventRegistration } from 'src/event_registration/entities/event_registration.entity';
import { Feedback } from 'src/feedback/entities/feedback.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';

@Entity()
export class Event {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({
    type: 'varchar',
    length: 100,
  })
  event_name: string;

  @ApiProperty()
  @Column({
    type: 'timestamp',
  })
  event_date: string;

  @ApiProperty()
  @Column({
    type: 'varchar',
    length: 100,
  })
  event_location: string;

  @ApiProperty()
  @Column({
    type: 'varchar',
  })
  event_description: string;

  @ManyToOne(() => User, (user) => user.events)
  @JoinTable()
  user: User;

  @OneToMany(() => Feedback, (feedback) => feedback.event)
  feedbacks: Feedback[];

  @OneToMany(
    () => EventRegistration,
    (eventRegistration) => eventRegistration.event,
  )
  registration: EventRegistration[];
}
