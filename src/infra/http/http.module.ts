import { GetUserByEmailUseCase } from '@/domain/exams/application/use-cases/get-user-by-email.use-case';
import { DatabaseModule } from '../database/database.module';
import { Module } from '@nestjs/common';
import { GetUserByEmailController } from './controllers/get-user-by-email.controller';
import { SignInWithEmailController } from './controllers/sign-in-with-email.controller';
import { SignInWithEmailUseCase } from '@/domain/exams/application/use-cases/sign-in-with-email.use-case';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { SignUpController } from './controllers/sign-up.controller';
import { SignUpUseCase } from '@/domain/exams/application/use-cases/sign-up.use-case';
import { FetchExamTemplatesController } from './controllers/fetch-exam-templates.controller';
import { FetchExamTemplatesUseCase } from '@/domain/exams/application/use-cases/fetch-exam-templates.use-case';
import { CreateExamTemplateController } from './controllers/create-exam-template.controller';
import { CreateExamTemplateUseCase } from '@/domain/exams/application/use-cases/create-exam-template.use-case';
import { UploadAttachmentController } from './controllers/upload-attachment.controller';
import { StorageModule } from '../storage/storage.module';
import { CreateAndUploadAttachmentUseCase } from '@/domain/exams/application/use-cases/create-and-upload-attachment.use-case';

@Module({
  imports: [DatabaseModule, CryptographyModule, StorageModule],
  controllers: [
    SignInWithEmailController,
    SignUpController,
    GetUserByEmailController,
    FetchExamTemplatesController,
    CreateExamTemplateController,
    UploadAttachmentController,
  ],
  providers: [
    SignInWithEmailUseCase,
    SignUpUseCase,
    GetUserByEmailUseCase,
    FetchExamTemplatesUseCase,
    CreateExamTemplateUseCase,
    CreateAndUploadAttachmentUseCase,
  ],
})
export class HttpModule {}
