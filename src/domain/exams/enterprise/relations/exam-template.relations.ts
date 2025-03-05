import { ExamTemplateStatus } from '@/domain/exams/enterprise/entities/exam-template.entity';
import { UserWithRelations, UserWithRelationsQuery } from './user.relations';
import { Fields } from '@/core/repositories/fields';
import { Query } from '@/core/repositories/query';
import {
  ExamTemplateQuestionWithRelations,
  ExamTemplateQuestionWithRelationsQuery,
} from './exam-template-question.relations';

export type ExamTemplateBody = Partial<{
  id: string;
  title: string;
  status: ExamTemplateStatus;
  createdAt: Date;
  updatedAt: Date | null;
}>;

export interface ExamTemplateRelations {
  author?: UserWithRelations;
  questions?: ExamTemplateQuestionWithRelations[];
}

export interface ExamTemplateWithRelations
  extends ExamTemplateBody,
    ExamTemplateRelations {}

export type ExamTemplateWithRelationsFields = Fields<ExamTemplateBody>;

export type ExamTemplateWithRelationsInclude = {
  author?: UserWithRelationsQuery;
  questions?: ExamTemplateQuestionWithRelationsQuery;
};

export type ExamTemplateWithRelationsQuery = Query<
  ExamTemplateWithRelationsFields,
  ExamTemplateWithRelationsInclude
>;
