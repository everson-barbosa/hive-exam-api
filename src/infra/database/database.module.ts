import { UsersRepository } from '@/domain/exams/application/repositories/users.repository';
import { PrismaService } from './prisma/prisma.service';
import { Module } from '@nestjs/common';
import { PrismaUsersRepository } from './prisma/repositories/prisma-users.repository';
import { ExamTemplatesRepository } from '@/domain/exams/application/repositories/exam-templates.repository';
import { PrismaExamTemplatesRepository } from './prisma/repositories/prisma-exam-templates.repository';
import { AttachmentsRepository } from '@/domain/exams/application/repositories/attachments.repository';
import { PrismaAttachmentsRepository } from './prisma/repositories/prisma-attachments.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: ExamTemplatesRepository,
      useClass: PrismaExamTemplatesRepository,
    },
    {
      provide: AttachmentsRepository,
      useClass: PrismaAttachmentsRepository,
    },
  ],
  exports: [
    PrismaService,
    UsersRepository,
    ExamTemplatesRepository,
    AttachmentsRepository,
  ],
})
export class DatabaseModule {}
