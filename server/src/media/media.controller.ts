import { Request } from 'express';
import { MediaService } from './media.service.js';
import { Controller, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('/quiz/:id/')
  @UseInterceptors(FileInterceptor('file'))
  uploadAsset(@Req() req: Request, @UploadedFile() file?: Express.Multer.File) {
    return this.mediaService.getUploadResult(req.path, file?.filename);
  }
}
