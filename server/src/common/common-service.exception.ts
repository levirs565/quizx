import { HttpException } from '@nestjs/common';

export class CommonServiceException extends HttpException {
  constructor(message: string) {
    super(message, 200);
  }
}
