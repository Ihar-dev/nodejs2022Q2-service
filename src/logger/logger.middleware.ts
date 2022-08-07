import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { inspect } from 'util';
import { LoggingService } from './logging.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private logger: LoggingService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { body } = req;
    const logString = `body: ${inspect(body)}`;
    this.logger.log(logString);
    next();
  }
}
