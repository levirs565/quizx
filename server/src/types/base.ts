import { ErrorObject } from 'ajv';

export interface ActionSuccessResponse {
  success: true;
}

export interface ErrorResponse {
  error: {
    code: number;
    message: string;
  };
}

export interface UploadMediaResponse {
  /**
   * Media path in server
   */
  path: string;
}
