import path from 'path';
import crypto from 'crypto';
import fs from 'fs-extra';
import { UploadMediaResponse } from '@quizx/shared';
import { Injectable } from '@nestjs/common';
import { AppConfigService } from '../app.config.service';
import { CommonServiceException } from 'common/common-service.exception';

@Injectable()
export class MediaService {
  uploadRoot: string;

  constructor(private readonly appConfig: AppConfigService) {
    this.uploadRoot = path.join(this.appConfig.storagePath, 'quiz');
  }

  getUploadDirectory(quizId: string) {
    const dir = path.join(this.uploadRoot, quizId);
    fs.ensureDirSync(dir);
    return dir;
  }

  getUploadFilename(originalName: string) {
    const extension = path.extname(originalName);
    return crypto.randomUUID() + extension;
  }

  getFilePath(quizId: string, name: string) {
    const filePath = path.join(this.uploadRoot, quizId, name);
    if (fs.existsSync(filePath)) return filePath;
    return undefined;
  }

  canUploadByMime(mime: string) {
    return mime.startsWith('image/');
  }

  getUploadResult(uploadPath: string, fileName?: string): UploadMediaResponse {
    if (!fileName) throw new CommonServiceException('File is not accepted');

    return {
      path: path.posix.join(uploadPath, fileName),
    };
  }
}
