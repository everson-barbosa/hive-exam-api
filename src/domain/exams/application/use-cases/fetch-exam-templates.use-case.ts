import { Either, right } from '@/core/either';
import {
  ExamTemplate,
  ExamTemplateOrdernationProps,
  ExamTemplateStatus,
} from '@/domain/exams/enterprise/entities/exam-template.entity';
import { ExamTemplatesRepository } from '../repositories/exam-templates.repository';
import { Order } from '@/core/types/order';

interface FetchExamTemplatesRequest {
  readonly page: number;
  readonly perPage: number;
  readonly order: Order;
  readonly orderBy: ExamTemplateOrdernationProps;
  readonly statuses: ExamTemplateStatus[];
}

type FetchExamTemplatesResponse = Either<
  null,
  {
    readonly examTemplates: ExamTemplate[];
  }
>;

export class FetchExamTemplates {
  constructor(private examTemplatesRepository: ExamTemplatesRepository) {}

  async execute({
    page,
    perPage,
    order,
    orderBy,
    statuses,
  }: FetchExamTemplatesRequest): Promise<FetchExamTemplatesResponse> {
    const examTemplates = await this.examTemplatesRepository.findMany(
      {
        page,
        perPage,
      },
      {
        order,
        orderBy,
      },
      statuses,
    );

    return right({ examTemplates });
  }
}
