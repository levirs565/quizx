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

  @Get('/quiz/:id/:name')
  getAsset(@Param('id') id: string, @Param('name') name: string, @Res() res: Response) {
    const fileName = this.mediaService.getFilePath(id, name);
    if (fileName)
      return new Promise<Response>((resolve, reject) => {
        res.sendFile(fileName, err => {
          if (err) reject(err);

          resolve(res);
        });
      });
    else return res.sendStatus(404);
  }
}
