import path from 'path';
import crypto from 'crypto';
import fs from 'fs-extra';
import config from '../config';
import { EError } from '../error';
import { UploadMediaResponse } from '../types/base';

const uploadRoot = path.join(config.storagePath, 'quiz');
export class MediaService {
  getUploadDirectory(quizId: string) {
    const dir = path.join(uploadRoot, quizId);
    fs.ensureDirSync(dir);
    return dir;
  }

  getUploadFilename(originalName: string) {
    const extension = path.extname(originalName);
    return crypto.randomUUID() + extension;
  }

  getFilePath(quizId: string, name: string) {
    const filePath = path.join(uploadRoot, quizId, name);
    if (fs.existsSync(filePath)) return filePath;
    return undefined;
  }

  canUploadByMime(mime: string) {
    return mime.startsWith('image/');
  }

  getUploadResult(uploadPath: string, fileName?: string): UploadMediaResponse {
    if (!fileName) throw new EError(200, 'File is not accepted');

    return {
      path: path.posix.join(uploadPath, fileName)
    };
  }
}

export default new MediaService()