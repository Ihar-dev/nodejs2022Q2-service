import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
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
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });

    const { originalUrl, query } = request;

    const { statusMessage } = response;
    const queryObj = inspect(query, { showHidden: false, depth: null });
    const exceptionString = `Request details: host: ${request.headers.host}, url: ${originalUrl},
     query parameters: ${queryObj}, Response details: message: ${statusMessage}, http status code: ${status}.`;
    this.logger.error(exceptionString);
    this.logger.warn(exceptionString);
    this.logger.debug(exceptionString);
    this.logger.verbose(exceptionString);
  }
}
