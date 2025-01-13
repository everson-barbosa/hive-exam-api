import { UsersRepository } from '@/domain/exams/application/repositories/users.repository';
import { PrismaService } from './prisma/prisma.service';
import { Module } from '@nestjs/common';
import { PrismaUsersRepository } from './prisma/repositories/prisma-users.repository';
import { ExamTemplatesRepository } from '@/domain/exams/application/repositories/exam-templates.repository';
import { PrismaExamTemplatesRepository } from './prisma/repositories/prisma-exam-templates.repository';

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
  ],
  exports: [PrismaService, UsersRepository, ExamTemplatesRepository],
})
export class DatabaseModule {}
