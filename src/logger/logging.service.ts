import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class LoggingService extends ConsoleLogger {
  log(message: string): void {
    super.log(message);
  }

  error(message: string): void {
    super.error(message);
  }
}
