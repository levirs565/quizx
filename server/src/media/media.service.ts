import path from 'path';
import crypto from 'crypto';
import { Injectable } from '@nestjs/common';
import { AppConfigService } from '../app.config.service';
import { FileStorage, PathNormalizerV1 } from '@flystorage/file-storage';
import { S3Client } from '@aws-sdk/client-s3';
import { AwsS3StorageAdapter } from '@flystorage/aws-s3';

type UploadTarget =
  | {
      type: 'local';
      rootPath: string;
    }
  | {
      type: 'flystorage';
      storage: FileStorage;
    };

@Injectable()
export class MediaService {
  uploadTarget: UploadTarget;

  constructor(private readonly appConfig: AppConfigService) {
    if (this.appConfig.storagePath) {
      this.uploadTarget = {
        type: 'local',
        rootPath: path.join(this.appConfig.storagePath, 'quiz'),
      };
    } else if (this.appConfig.s3Bucket) {
      const client = new S3Client();
      const adapter = new AwsS3StorageAdapter(client, {
        bucket: this.appConfig.s3Bucket,
        prefix: path.posix.join(this.appConfig.s3Prefix ?? '', 'quiz')
      });
      const storage = new FileStorage(adapter);
      this.uploadTarget = {
        type: 'flystorage',
        storage,
      };
    } else {
      throw new Error('Please provide S3 Config or STORAGE_PATH');
    }
  }

  getUploadFilename(originalName: string) {
    const extension = path.extname(originalName);
    return crypto.randomUUID() + extension;
  }

  canUploadByMime(mime: string) {
    return mime.startsWith('image/');
  }
}
