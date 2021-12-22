import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get serverPort(): number {
    return parseInt(this.configService.get('SERVER_PORT')!!);
  }
  get serverCorsOrigin(): string {
    return this.configService.get('SERVER_CORS_ORIGIN')!!;
  }
  get dbUri(): string {
    return this.configService.get('DB_URI')!!;
  }
  get sessionSecret(): string {
    return this.configService.get('SESSION_SECRET')!!;
  }
  get storagePath(): string {
    return this.configService.get('STORAGE_PATH')!!;
  }
}
