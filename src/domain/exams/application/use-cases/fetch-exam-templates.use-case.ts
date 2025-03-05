import { Either, right } from '@/core/either';
import {
  ExamTemplate,
  ExamTemplateOrdernationProps,
  ExamTemplateStatus,
} from '@/domain/exams/enterprise/entities/exam-template.entity';
import { ExamTemplatesRepository } from '../repositories/exam-templates.repository';
import { Order } from '@/core/types/order';
import { Injectable } from '@nestjs/common';

interface FetchExamTemplatesUseCaseRequest {
  readonly page: number;
  readonly perPage: number;
  readonly order: Order;
  readonly orderBy: ExamTemplateOrdernationProps;
  readonly statuses: ExamTemplateStatus[];
}

type FetchExamTemplatesUseCaseResponse = Either<
  null,
  {
    readonly examTemplates: ExamTemplate[];
  }
>;

@Injectable()
export class FetchExamTemplatesUseCase {
  constructor(private examTemplatesRepository: ExamTemplatesRepository) {}

  async execute({
    page,
    perPage,
    order,
    orderBy,
    statuses,
  }: FetchExamTemplatesUseCaseRequest): Promise<FetchExamTemplatesUseCaseResponse> {
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
