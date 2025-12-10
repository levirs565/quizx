import { Injectable } from '@nestjs/common';
import { MulterOptionsFactory } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import multer from 'multer';
import { MediaService } from './media.service';
import { QuizService } from 'quiz/quiz.service';
import { FlystorageMulterStorageEngine } from '@flystorage/multer-storage';
import path from 'path';
import fs from 'fs-extra';

@Injectable()
export class MediaMulterConfig implements MulterOptionsFactory {
  constructor(
    private readonly mediaService: MediaService,
    private readonly quizService: QuizService
  ) {}

  private createStorage() {
    const mediaService = this.mediaService;
    const uploadTarget = this.mediaService.uploadTarget;
    if (uploadTarget.type == 'local') {
      return multer.diskStorage({
        destination(req, file, cb) {
          const dir = path.join(uploadTarget.rootPath, req.params.id);
          fs.ensureDirSync(dir);
          cb(null, dir);
        },
        filename(req, file, cb) {
          cb(null, mediaService.getUploadFilename(file.originalname));
        },
      });
    }

    return new FlystorageMulterStorageEngine(uploadTarget.storage, async (action, req, file) => {
      return path.posix.join(
        req.params.id,
        mediaService.getUploadFilename(file.originalname)
      );
    });
  }

  createMulterOptions(): MulterOptions | Promise<MulterOptions> {
    const mediaService = this.mediaService;
    const quizService = this.quizService;
    const storage = this.createStorage();
    return {
      storage,
      fileFilter(req, file, cb) {
        quizService
          .validateUserCanUpload(req.session, req.params.id)
          .then(() => {
            cb(null, mediaService.canUploadByMime(file.mimetype));
          })
          .catch((reason) => {
            cb(reason, false);
          });
      },
    };
  }
}
