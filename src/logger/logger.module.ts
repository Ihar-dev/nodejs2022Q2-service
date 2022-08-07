import { Module } from '@nestjs/common';
import { LoggerMiddleware } from './logger.middleware';
import { LoggingService } from './logging.service';

@Module({
  exports: [LoggingService, LoggerMiddleware],
  providers: [LoggingService, LoggerMiddleware],
})
export class LoggerModule {}
