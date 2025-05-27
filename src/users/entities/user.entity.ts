import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from '../enums/roleEnums';
import { Event } from 'src/events/entities/event.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  email: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  passowrd!: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  phone!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @Column({
    type: 'enum',
    enum: UserRole,
    nullable: false,
    default: UserRole.USER,
  })
  role!: UserRole;

  @ManyToOne(() => Event, (event) => event.created_by)
  events: Event[];

  @CreateDateColumn()
  created_at!: Timestamp;

  @UpdateDateColumn()
  updateed_at!: Timestamp;
}
