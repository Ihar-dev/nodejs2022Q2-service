import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { LoggingService } from './logger/logging.service';
import { HttpExceptionFilter } from './logger/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new LoggingService(),
  });

  process.on('uncaughtException', (error) => {
    this.logger.error(
      `Uncaught Exception Thrown: message: ${error.message}, stack: ${error.stack}.`,
    );
    this.logger.warn(
      `Uncaught Exception Thrown: message: ${error.message}, stack: ${error.stack}.`,
    );
    this.logger.debug(
      `Uncaught Exception Thrown: message: ${error.message}, stack: ${error.stack}.`,
    );
    this.logger.verbose(
      `Uncaught Exception Thrown: message: ${error.message}, stack: ${error.stack}.`,
    );
    process.exit(1);
  });

  process.on('unhandledRejection', (reason, promise) => {
    this.logger.error(
      `Unhandled Rejection: reason: ${reason}, promise: ${promise}.`,
    );
    this.logger.warn(
      `Unhandled Rejection: reason: ${reason}, promise: ${promise}.`,
    );
    this.logger.debug(
      `Unhandled Rejection: reason: ${reason}, promise: ${promise}.`,
    );
    this.logger.verbose(
      `Unhandled Rejection: reason: ${reason}, promise: ${promise}.`,
    );
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  const port = process.env.PORT || 4000;

  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Home music library service')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('doc', app, document);

  const logger = new LoggingService();
  app.useGlobalFilters(new HttpExceptionFilter(logger));
  app.listen(port);
}
bootstrap();
