import { UsersModule } from './../users/users.module';
import { Module } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feedback } from './entities/feedback.entity';
import { EventsModule } from 'src/events/events.module';

@Module({
  controllers: [FeedbackController],
  providers: [FeedbackService],
  imports: [UsersModule, EventsModule, TypeOrmModule.forFeature([Feedback])], // Add your Feedback entity here
})
export class FeedbackModule {}
