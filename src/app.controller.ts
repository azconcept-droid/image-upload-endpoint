import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DigitalOceanService } from './digitalocean/digitalocean.service';

@Controller('/api/v1/do-s3')
export class AppController {
  constructor(private readonly digitalOceanService: DigitalOceanService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is required');
    }
    const buffer = file.buffer;
    const filename = file.originalname;

    const imageUrl = await this.digitalOceanService.uploadFile(
      buffer,
      filename,
    );

    return { imageUrl };
  }
}
