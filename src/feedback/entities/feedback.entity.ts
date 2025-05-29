/* eslint-disable @typescript-eslint/no-unused-vars */
import { Event } from 'src/events/entities/event.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Feedback {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Event, (event) => event.feedbacks)
  event: Event;

  @ManyToOne(() => User, (user) => user.feedbacks)
  user: User;

  @Column({
    type: 'int',
    nullable: false,
    default: 0,
  })
  rating: number;

  @Column({ type: 'text' })
  comments: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
