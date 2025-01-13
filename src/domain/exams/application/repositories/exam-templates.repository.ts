import { Ordernation } from '@/core/repositories/ordernation';
import { Pagination } from '@/core/repositories/pagination';
import {
  ExamTemplate,
  ExamTemplateOrdernationProps,
  ExamTemplateStatus,
} from '@/domain/exams/enterprise/entities/exam-template.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class ExamTemplatesRepository {
  abstract create(examTemplate: ExamTemplate): Promise<void>;
  abstract findMany(
    pagination: Pagination,
    ordernation: Ordernation<ExamTemplateOrdernationProps>,
    fields: any,
    statuses?: ExamTemplateStatus[],
  ): Promise<ExamTemplate[]>;
}
