import multer from 'multer';
import { Get, JsonController, Param, Post, Req, Res, UploadedFile } from 'routing-controllers';
import { Response, Request } from 'express';
import MediaService from '../services/media';
import QuizService from '../services/quiz';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, MediaService.getUploadDirectory(req.params.id));
  },
  filename(req, file, cb) {
    cb(null, MediaService.getUploadFilename(file.originalname));
  }
});
const uploader = multer({
  storage,
  fileFilter(req, file, cb) {
    QuizService.validateUserCanUpload(req.session, req.params.id)
      .then(() => {
        cb(null, MediaService.canUploadByMime(file.mimetype));
      })
      .catch(reason => {
        cb(reason);
      });
  }
});

@JsonController('/media')
export class MediaController {
  @Post('/quiz/:id/')
  uploadAsset(
    @Req() req: Request,
    @UploadedFile('file', { options: uploader }) file?: Express.Multer.File
  ) {
    return MediaService.getUploadResult(req.path, file?.filename);
  }

  @Get('/quiz/:id/:name')
  getAsset(@Param('id') id: string, @Param('name') name: string, @Res() res: Response) {
    const fileName = MediaService.getFilePath(id, name);
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
