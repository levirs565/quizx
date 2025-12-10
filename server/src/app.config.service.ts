import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get serverPort(): number {
    return parseInt(this.configService.get('SERVER_PORT')!);
  }
  get serverCorsOrigin(): string {
    return this.configService.get('SERVER_CORS_ORIGIN')!;
  }
  get dbUri(): string {
    return this.configService.get('DB_URI')!;
  }
  get sessionSecret(): string {
    return this.configService.get('SESSION_SECRET')!;
  }
  get storagePath(): string | undefined {
    return this.configService.get('STORAGE_PATH');
  }
  get s3Bucket(): string | undefined {
    return this.configService.get('S3_BUCKET');
  }
  get s3Prefix(): string | undefined {
    return this.configService.get('S3_PREFIX');
  }
}
