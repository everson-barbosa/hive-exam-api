import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { ExamTemplateQuestionList } from '@/domain/exams/enterprise/entities/exam-template-question.watched-list';
import {
  ExamTemplate,
  ExamTemplateStatus,
} from '@/domain/exams/enterprise/entities/exam-template.entity';
import { ExamTemplate as PrismaExamTemplate, $Enums } from '@prisma/client';

export class PrismaExamTemplatesMapper {
  static toPrisma(raw: ExamTemplate): PrismaExamTemplate {
    return {
      id: raw.id.toString(),
      authorId: raw.authorId.toString(),
      title: raw.title,
      createdAt: raw.createdAt,
      updateAt: raw.updatedAt,
      status: $Enums.ExamTemplateStatus[raw.status],
    };
  }

  static toDomain(raw: PrismaExamTemplate): ExamTemplate {
    return ExamTemplate.create(
      {
        authorId: new UniqueEntityID(raw.authorId),
        title: raw.title,
        createdAt: raw.createdAt,
        updatedAt: raw.updateAt,
        status: ExamTemplateStatus[raw.status],
        questions: new ExamTemplateQuestionList([]),
      },
      new UniqueEntityID(raw.id),
    );
  }
}
