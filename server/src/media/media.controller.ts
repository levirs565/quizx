import { Response, Request } from 'express';
import { MediaService } from './media.service';
import { Controller, Get, Param, Post, Req, Res, UploadedFile } from '@nestjs/common';

@Controller()
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('/quiz/:id/')
  uploadAsset(@Req() req: Request, @UploadedFile('file') file?: Express.Multer.File) {
    return this.mediaService.getUploadResult(req.path, file?.filename);
  }
}
