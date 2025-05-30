import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ConsoleLogger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      prefix: 'MyApp', // Default is "Nest"
      logLevels: ['log', 'error', 'warn', 'debug', 'verbose'], // Default is ['log', 'error', 'warn']
      colors: true, // Default is true
      timestamp: true, // Default is false
      json: true, // Default is false
    }),
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strip out properties that are not in the DTO
      forbidNonWhitelisted: true, // throw an error if a property is not in the DTO is in the request body
      transform: true, // transform the request body to be an instance of the DTO class after validation and not a plain object
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
}
bootstrap();
