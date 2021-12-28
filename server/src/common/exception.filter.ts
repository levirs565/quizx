import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { ErrorResponse } from 'types/base';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private static readonly logger = new Logger('ExceptionHandler');

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      httpStatus = exception.getStatus();
      const rawMessage = (exception.getResponse() as any).message;
      if (typeof rawMessage === 'string') {
        message = rawMessage;
      } else if (rawMessage instanceof Array) {
        message = rawMessage.join(', ');
      } else {
        message = exception.message;
      }
    } else {
      AllExceptionsFilter.logger.error(exception);
    }

    const responseBody: ErrorResponse = {
      error: {
        code: httpStatus,
        message: message,
      },
    };

    response.status(httpStatus).json(responseBody);
  }
}
