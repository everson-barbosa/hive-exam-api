import { CreateAndUploadAttachmentUseCase } from '@/domain/exams/application/use-cases/create-and-upload-attachment.use-case';
import { InvalidAttachmentTypeError } from '@/domain/exams/application/use-cases/errors/invalid-attachment-type.error';
import {
  BadRequestException,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AttachmentPresenter } from '../presenters/attachment.presenter';

@Controller('/attachments')
export class UploadAttachmentController {
  constructor(
    private createAndUploadAttachmentUseCase: CreateAndUploadAttachmentUseCase,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async handle(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1024 * 1024 * 2, // 2mb
          }),
          new FileTypeValidator({ fileType: '.(png|jpg|jpeg|pdf)' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const result = await this.createAndUploadAttachmentUseCase.execute({
      fileName: file.originalname,
      fileType: file.mimetype,
      buffer: file.buffer,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case InvalidAttachmentTypeError:
          throw new BadRequestException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }

    return {
      attachment: AttachmentPresenter.toHTTP(result.value.attachment),
    };
  }
}
