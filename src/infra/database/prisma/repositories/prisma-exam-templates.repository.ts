import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ExamTemplatesRepository } from '@/domain/exams/application/repositories/exam-templates.repository';
import {
  ExamTemplate,
  ExamTemplateOrdernationProps,
  ExamTemplateStatus,
} from '@/domain/exams/enterprise/entities/exam-template.entity';
import { Ordernation } from '@/core/repositories/ordernation';
import { Pagination } from '@/core/repositories/pagination';
import { PrismaExamTemplatesMapper } from '../mappers/prisma-exam-templates.mapper';
import { $Enums } from '@prisma/client';

@Injectable()
export class PrismaExamTemplatesRepository implements ExamTemplatesRepository {
  constructor(private prismaService: PrismaService) {}

  async create(examTemplate: ExamTemplate): Promise<void> {
    const data = PrismaExamTemplatesMapper.toPrisma(examTemplate);

    await this.prismaService.examTemplate.create({ data });
  }

  async findMany(
    pagination: Pagination,
    ordernation: Ordernation<ExamTemplateOrdernationProps>,
    statuses?: ExamTemplateStatus[],
  ): Promise<ExamTemplate[]> {
    const data = await this.prismaService.examTemplate.findMany({
      take: pagination.perPage,
      skip: (pagination.page - 1) * pagination.perPage,
      orderBy: {
        [ordernation.orderBy]: ordernation.order,
      },
      where: statuses
        ? {
            status: {
              in: statuses.map((status) => $Enums.ExamTemplateStatus[status]),
            },
          }
        : undefined,
    });

    return data.map(PrismaExamTemplatesMapper.toDomain);
  }
}
