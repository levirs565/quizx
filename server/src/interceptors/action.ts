import { InterceptorInterface } from 'routing-controllers';
import { ActionSuccessResponse } from '../types/base';

export class ActionInterceptor implements InterceptorInterface {
  intercept() {
    const response: ActionSuccessResponse = {
      success: true
    };
    return response;
  }
}
