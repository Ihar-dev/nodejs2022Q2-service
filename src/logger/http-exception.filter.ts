import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { inspect } from 'util';

import { LoggingService } from './logging.service';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private logger: LoggingService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });

    const { originalUrl, query } = request;
    const queryObj = inspect(query);
    const exceptionString = `Request details: host: ${request.headers.host}, url: ${originalUrl},
     query parameters: ${queryObj}, status code: ${status}.`;
    this.logger.error(exceptionString);
  }
}
