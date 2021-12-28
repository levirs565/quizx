import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { AppConfigModule } from 'app.config.module';
import { MediaController } from './media.controller';
import { MediaMulterConfig } from './media.multer.config';
import { MediaService } from './media.service';
import { QuizModule } from 'quiz/quiz.module';

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
