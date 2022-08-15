import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { inspect } from 'util';
import { LoggingService } from './logging.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private logger: LoggingService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { body, originalUrl, query } = req;
    const queryObj = inspect(query, { showHidden: false, depth: null });
    let logString = `Request details: host: ${
      req.headers.host
    }, url: ${originalUrl}, body: ${inspect(
      body,
    )}, query parameters: ${queryObj}.`;

    res.on('finish', () => {
      const { statusCode, statusMessage } = res;
      logString += ` Response details: message: ${statusMessage}, status code: ${statusCode}.`;
      this.logger.log(logString);
    });
    next();
  }
}
