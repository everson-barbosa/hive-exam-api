import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { ExamTemplateQuestionList } from '@/domain/exams/enterprise/entities/exam-template-question.watched-list';
import {
  ExamTemplate,
  ExamTemplateStatus,
} from '@/domain/exams/enterprise/entities/exam-template.entity';
import { ExamTemplateWithRelationsQuery } from '@/domain/exams/enterprise/relations/exam-template.relations';
import {
  ExamTemplate as PrismaExamTemplate,
  $Enums,
  Prisma,
} from '@prisma/client';

export class PrismaExamTemplatesMapper {
  static toPrisma(raw: ExamTemplate): PrismaExamTemplate {
    return {
      id: raw.id.toString(),
      authorId: raw.authorId.toString(),
      title: raw.title,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      status: $Enums.ExamTemplateStatus[raw.status],
    };
  }

  static toDomain(raw: PrismaExamTemplate): ExamTemplate {
    return ExamTemplate.create(
      {
        authorId: new UniqueEntityID(raw.authorId),
        title: raw.title,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        status: ExamTemplateStatus[raw.status],
        questions: new ExamTemplateQuestionList([]),
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toQuerySelect(
    raw?: ExamTemplateWithRelationsQuery,
  ): Prisma.ExamTemplateSelect {
    return {};
  }
}
