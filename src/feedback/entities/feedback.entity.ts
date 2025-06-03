/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Event, (event) => event.feedbacks)
  event: Event;

  @ManyToOne(() => User, (user) => user.feedbacks)
  user: User;

  @ApiProperty()
  @Column({
    type: 'int',
    nullable: false,
    default: 0,
  })
  rating: number;

  @ApiProperty()
  @Column({ type: 'text' })
  comments: string;

  @ApiProperty()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
