import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class LoggingService extends ConsoleLogger {
  log(message: unknown, context?: unknown): void {
    super.log(message, context);
  }

  error(message: any, stack?: string, context?: string): void;
  error(message: any, ...optionalParams: any[]): void;
  error(message: unknown, context?: unknown): void {
    super.error(message, context);
  }
}
