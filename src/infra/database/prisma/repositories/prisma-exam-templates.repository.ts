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
import {
  ExamTemplateWithRelationsQuery,
  ExamTemplateWithRelations,
} from '@/domain/exams/enterprise/relations/exam-template.relations';
// import { $Enums } from '@prisma/client';

@Injectable()
export class PrismaExamTemplatesRepository implements ExamTemplatesRepository {
  constructor(private prismaService: PrismaService) {}

  async findById(id: string): Promise<ExamTemplate | null> {
    const data = await this.prismaService.examTemplate.findUnique({
      where: {
        id,
      },
    });

    if (!data) return null;

    return PrismaExamTemplatesMapper.toDomain(data);
  }

  async findWithRelationsById(
    id: string,
    query: ExamTemplateWithRelationsQuery,
  ): Promise<Partial<ExamTemplateWithRelations> | null> {
    const { fields, include } = query;

    const data = await this.prismaService.examTemplate.findUnique({
      where: {
        id,
      },
      include: {},
    });

    if (!data) return null;
  }

  async create(examTemplate: ExamTemplate): Promise<void> {
    const data = PrismaExamTemplatesMapper.toPrisma(examTemplate);

    await this.prismaService.examTemplate.create({
      data,
    });
  }

  async save(examTemplate: ExamTemplate): Promise<void> {
    const data = PrismaExamTemplatesMapper.toPrisma(examTemplate);

    await this.prismaService.examTemplate.update({
      data,
      where: {
        id: data.id,
      },
    });
  }

  async findMany(
    pagination: Pagination,
    ordernation: Ordernation<ExamTemplateOrdernationProps>,
    statuses?: ExamTemplateStatus[],
  ): Promise<ExamTemplate[]> {
    console.log(statuses);

    const data = await this.prismaService.examTemplate.findMany({
      take: pagination.perPage,
      skip: (pagination.page - 1) * pagination.perPage,
      orderBy: {
        [ordernation.orderBy]: ordernation.order,
      },
      include: {
        questions: true,
      },
    });

    return data.map(PrismaExamTemplatesMapper.toDomain);
  }
}
