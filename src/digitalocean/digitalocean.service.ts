import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
// @typescript-eslint/no-require-imports
require('aws-sdk/lib/maintenance_mode_message').suppress = true;

@Injectable()
export class DigitalOceanService {
  private s3: AWS.S3;
  constructor() {
    this.s3 = new AWS.S3({
      endpoint: 'digital ocean space endpoint',
      accessKeyId: 'digital ocean access key',
      secretAccessKey: 'digital ocean secret access key',
      region: 'digital ocean region',
    });
  }

  async uploadFile(buffer: Buffer, filename: string): Promise<string> {
    const params = {
      Bucket: 'bucket name',
      Key: filename,
      Body: buffer,
    };
    const { Location } = await this.s3.upload(params).promise();
    return Location;
  }
}
