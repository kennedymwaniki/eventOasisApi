import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { FeedbackModule } from './feedback/feedback.module';
import { EventRegistrationModule } from './event_registration/event_registration.module';
import { PaymentsModule } from './payments/payments.module';
import { TicketsModule } from './tickets/tickets.module';
import { CacheableMemory } from 'cacheable';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import databaseConfig from './config/databaseConfig';
import { LoggerMiddleware } from './logger.middleware';

import { CacheModule, CacheInterceptor } from '@nestjs/cache-manager';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core'; //! APP_INTERCEPTOR add this to restore caching
import { createKeyv, Keyv } from '@keyv/redis';
import { AcesstokenGuard } from './auth/guards/Accesstokenguard';

import { PaginationModule } from './pagination/pagination.module';
import { LogsModule } from './logs/logs.module';
import { MailModule } from './mail/mail.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    UsersModule,
    EventsModule,
    FeedbackModule,
    EventRegistrationModule,
    PaymentsModule,
    AuthModule,
    PaginationModule,
    LogsModule,
    MailModule,
    TicketsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [databaseConfig], // path to the environment variables file
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      isGlobal: true,
      useFactory: (configService: ConfigService) => {
        return {
          ttl: 60000, // 60 sec: Cache time-to-live
          stores: [
            new Keyv({
              store: new CacheableMemory({
                ttl: 60 * 60 * 1000,
                lruSize: 5000,
              }),
            }),
            createKeyv(configService.get<string>('REDIS_URL')),
          ],
        };
      },
    }),

    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000, // 60 seconds
          limit: 10, // 10 requests per minute
        },
      ],
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST', 'localhost'),
        port: configService.get<number>('DATABASE_PORT', 5432),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        autoLoadEntities: true,
        // ssl: true, //set true in production
        synchronize: true,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: AcesstokenGuard, // Global guard to protect routes
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard, // Global throttler guard to limit requests
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
