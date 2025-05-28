/* eslint-disable @typescript-eslint/no-unused-vars */
import { EventRegistration } from 'src/event_registration/entities/event_registration.entity';
import { Feedback } from 'src/feedback/entities/feedback.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
  })
  event_name: string;

  @Column({
    type: 'timestamp',
  })
  event_date: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  event_location: string;

  @Column({
    type: 'varchar',
  })
  event_description: string;

  // @OneToMany(() => User, (user) => user.events)
  // user: User;

  // @OneToMany(() => Feedback, (feedback) => feedback.event)
  // feedbacks: Feedback[];

  // @ManyToMany(
  //   () => EventRegistration,
  //   (eventRegistration) => eventRegistration.event,
  // )
  // registration: EventRegistration[];
}
