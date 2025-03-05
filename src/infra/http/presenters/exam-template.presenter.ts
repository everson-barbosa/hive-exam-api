import { ExamTemplate } from '@/domain/exams/enterprise/entities/exam-template.entity';

export class ExamTemplatePresenter {
  static toHTTP(examTemplate: ExamTemplate) {
    return {
      id: examTemplate.id.toString(),
      title: examTemplate.title,
      status: examTemplate.status,
      createdAt: examTemplate.createdAt,
      updatedAt: examTemplate.updatedAt,
    };
  }
}
