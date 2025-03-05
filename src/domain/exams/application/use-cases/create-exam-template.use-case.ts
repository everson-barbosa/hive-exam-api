import { Either, right } from '@/core/either';
import {
  ExamTemplate,
  ExamTemplateStatus,
} from '@/domain/exams/enterprise/entities/exam-template.entity';
import { ExamTemplatesRepository } from '../repositories/exam-templates.repository';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { ExamTemplateQuestion } from '@/domain/exams/enterprise/entities/exam-template-question.entity';
import { ExamTemplateQuestionList } from '@/domain/exams/enterprise/entities/exam-template-question.watched-list';
import { Injectable } from '@nestjs/common';

interface CreateExamTemplateUseCaseRequest {
  readonly title: string;
  readonly authorId: string;
  readonly questionIds: string[];
}

type CreateExamTemplateUseCaseResponse = Either<
  null,
  {
    examTemplate: ExamTemplate;
  }
>;

@Injectable()
export class CreateExamTemplateUseCase {
  constructor(private examTemplatesRepository: ExamTemplatesRepository) {}

  async execute({
    title,
    authorId,
    questionIds,
  }: CreateExamTemplateUseCaseRequest): Promise<CreateExamTemplateUseCaseResponse> {
    const examTemplate = ExamTemplate.create({
      authorId: new UniqueEntityID(authorId),
      status: ExamTemplateStatus.CREATED,
      title,
    });

    const questions = questionIds.map((questionId) =>
      ExamTemplateQuestion.create({
        examTemplateId: examTemplate.id,
        questionId: new UniqueEntityID(questionId),
      }),
    );

    examTemplate.questions = new ExamTemplateQuestionList(questions);

    await this.examTemplatesRepository.create(examTemplate);

    return right({ examTemplate });
  }
}
