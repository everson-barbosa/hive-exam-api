import {
  Uploader,
  UploadProps,
} from '@/domain/exams/application/storage/uploader';
import { Injectable } from '@nestjs/common';
import { EnvService } from '../env/env.service';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';

@Injectable()
export class SupabaseUploader implements Uploader {
  client: S3Client;

  constructor(private envService: EnvService) {
    const projectId = this.envService.get('SUPABASE_PROJECT_ID');

    this.client = new S3Client({
      endpoint: `https://${projectId}.supabase.co/storage/v1/s3`,
      region: 'sa-east-1',
      forcePathStyle: true,
      credentials: {
        accessKeyId: this.envService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.envService.get('AWS_SECRET_ACCESS_KEY'),
      },
    });
  }

  async upload({
    fileName,
    fileType,
    buffer,
  }: UploadProps): Promise<{ readonly url: string }> {
    const fileId = randomUUID();
    const uniqueFileName = `${fileId}-${fileName}`;

    const command = new PutObjectCommand({
      Bucket: this.envService.get('AWS_BUCKET_NAME'),
      Key: uniqueFileName,
      ContentType: fileType,
      Body: buffer,
      Metadata: {
        'x-api-key':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkdHJ4YmdreXN4cnhhemdvb2dxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkxMDgwMDQsImV4cCI6MjA1NDY4NDAwNH0.krXu-LR87_1JUWrj1AyKHjXD26eR3DjSAmC_3oDWuUM',
      },
    });

    await this.client.send(command);

    return {
      url: uniqueFileName,
    };
  }
}
