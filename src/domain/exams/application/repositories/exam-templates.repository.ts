import { Ordernation } from '@/core/repositories/ordernation';
import { Pagination } from '@/core/repositories/pagination';
import {
  ExamTemplate,
  ExamTemplateOrdernationProps,
  ExamTemplateStatus,
} from '@/domain/exams/enterprise/entities/exam-template.entity';
import { Injectable } from '@nestjs/common';
import {
  ExamTemplateWithRelations,
  ExamTemplateWithRelationsQuery,
} from '../../enterprise/relations/exam-template.relations';

@Injectable()
export abstract class ExamTemplatesRepository {
  abstract create(examTemplate: ExamTemplate): Promise<void>;
  abstract findById(id: string): Promise<ExamTemplate | null>;
  abstract findWithRelationsById(
    id: string,
    query: ExamTemplateWithRelationsQuery,
  ): Promise<Partial<ExamTemplateWithRelations> | null>;
  abstract findMany(
    pagination: Pagination,
    ordernation: Ordernation<ExamTemplateOrdernationProps>,
    statuses?: ExamTemplateStatus[],
  ): Promise<ExamTemplate[]>;
}
