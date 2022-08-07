import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { LoggingService } from './logging.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private logger: LoggingService) {}

  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    next();
  }
}
