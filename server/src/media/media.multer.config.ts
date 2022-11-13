import { Injectable } from '@nestjs/common';
import { MulterOptionsFactory } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface.js';
import multer from 'multer';
import { MediaService } from './media.service.js';
import { QuizService } from '../quiz/quiz.service.js';

@Injectable()
export class MediaMulterConfig implements MulterOptionsFactory {
  constructor(
    private readonly mediaService: MediaService,
    private readonly quizService: QuizService
  ) {}

  createMulterOptions(): MulterOptions | Promise<MulterOptions> {
    const mediaService = this.mediaService;
    const quizService = this.quizService;
    const storage = multer.diskStorage({
      destination(req, file, cb) {
        cb(null, mediaService.getUploadDirectory(req.params.id));
      },
      filename(req, file, cb) {
        cb(null, mediaService.getUploadFilename(file.originalname));
      },
    });
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
