import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ActionSuccessResponse } from '@quizx/shared';

@Injectable()
export class ActionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response: ActionSuccessResponse = {
      success: true,
    };
    return next.handle().pipe(map(() => response));
  }
}
