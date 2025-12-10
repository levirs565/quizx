import { Request } from 'express';
import { MediaService } from './media.service';
import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadMediaResponse } from 'types/base';
import { CommonServiceException } from 'common/common-service.exception';
import path from 'path';
import fs from 'fs-extra';

@Controller()
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get('/quiz/:id/:file')
  async getAsset(@Param('id') id: string, @Param('file') name: string) {
    const uploadTarget = this.mediaService.uploadTarget;
    if (uploadTarget.type == 'local') {
      const file = fs.createReadStream(path.join(uploadTarget.rootPath, id, name));
      return new StreamableFile(file, {
        type: 'image/*',
      });
    }

    const buffer = await uploadTarget.storage.read(path.posix.join(id, name));
    return new StreamableFile(buffer, {
      type: 'image/*',
    });
  }

  @Post('/quiz/:id/')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAsset(
    @Req() req: Request,
    @UploadedFile() file?: Express.Multer.File
  ): Promise<UploadMediaResponse> {
    if (!file) throw new CommonServiceException('File is not accepted');

    const uploadTarget = this.mediaService.uploadTarget;
    if (uploadTarget.type == 'local') {
      return {
        path: path.posix.join(req.path, file.filename!),
      };
    }

    return {
      path: path.posix.join(req.path, path.posix.basename(file.destination)),
    };
  }
}
