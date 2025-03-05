import {
  Uploader,
  UploadProps,
} from '@/domain/exams/application/storage/uploader';

export class FakeUploader implements Uploader {
  public uploads: Array<{ url: string; buffer: Buffer }> = [];

  async upload({
    fileName,
    fileType,
    buffer,
  }: UploadProps): Promise<{ readonly url: string }> {
    const fakeBucketUrl = 'http://fake-bucket-url';
    const url = `${fakeBucketUrl}/${fileName}.${fileType}`;

    this.uploads.push({ url, buffer });

    return {
      url: `${fakeBucketUrl}/${fileName}.${fileType}`,
    };
  }
}
