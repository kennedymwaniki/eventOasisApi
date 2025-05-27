import { Feedback } from 'src/feedback/entities/feedback.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
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
    type: 'timestamp with local time zone',
  })
  event_date: Timestamp;

  @Column({
    type: 'varchar',
    length: 100,
  })
  event_location: string;

  @Column({
    type: 'varchar',
  })
  event_description: string;

  @OneToMany(() => User, (user) => user.events)
  created_by: User;

  @OneToMany(() => Feedback, (feedback) => feedback.event)
  feedbacks: Feedback[];
}
