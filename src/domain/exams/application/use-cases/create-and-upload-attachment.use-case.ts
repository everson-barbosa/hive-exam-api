import { Either, left, right } from '@/core/either';
import { Injectable } from '@nestjs/common';
import { Attachment } from '../../enterprise/entities/attachment.entity';
import { AttachmentsRepository } from '../repositories/attachments.repository';
import { InvalidAttachmentTypeError } from './errors/invalid-attachment-type.error';
import { Uploader } from '../storage/uploader';

interface CreateAndUploadAttachmentUseCaseRequest {
  readonly fileName: string;
  readonly fileType: string;
  readonly buffer: Buffer;
}

type CreateAndUploadAttachmentUseCaseResponse = Either<
  InvalidAttachmentTypeError,
  {
    attachment: Attachment;
  }
>;

const FILE_TYPE_REGEX = /^image\/(jpeg|png)|application\/pdf$/; // jpg, jpeg, png and pdf

@Injectable()
export class CreateAndUploadAttachmentUseCase {
  constructor(
    private attachmentsRepository: AttachmentsRepository,
    private uploader: Uploader,
  ) {}

  async execute({
    fileName,
    fileType,
    buffer,
  }: CreateAndUploadAttachmentUseCaseRequest): Promise<CreateAndUploadAttachmentUseCaseResponse> {
    const isFileTypeValid = FILE_TYPE_REGEX.test(fileType);

    if (!isFileTypeValid) {
      return left(new InvalidAttachmentTypeError(fileType));
    }

    const { url } = await this.uploader.upload({
      fileName,
      fileType,
      buffer,
    });

    const attachment = Attachment.create({
      title: fileName,
      url,
    });

    await this.attachmentsRepository.create(attachment);

    return right({
      attachment,
    });
  }
}
