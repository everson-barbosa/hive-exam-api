import { Injectable } from '@nestjs/common';

export interface UploadProps {
  readonly fileName: string;
  readonly fileType: string;
  readonly buffer: Buffer;
}

@Injectable()
export abstract class Uploader {
  abstract upload(props: UploadProps): Promise<{ readonly url: string }>;
}
