import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { AppConfigModule } from '../app.config.module.js';
import { MediaController } from './media.controller.js';
import { MediaMulterConfig } from './media.multer.config.js';
import { MediaService } from './media.service.js';
import { QuizModule } from '../quiz/quiz.module.js';

@Module({
  imports: [
    MulterModule.registerAsync({
      useClass: MediaMulterConfig,
      imports: [MediaModule, QuizModule],
    }),
    AppConfigModule,
  ],
  controllers: [MediaController],
  providers: [MediaService],
  exports: [MediaService],
})
export class MediaModule {}
