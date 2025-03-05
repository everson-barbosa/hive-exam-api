import { Either, right } from '@/core/either';
import { ExamTemplatesRepository } from '../repositories/exam-templates.repository';
import { ExamTemplateWithRelationsQuery } from '../../enterprise/relations/exam-template.relations';

interface GetExamTemplateByIdUseCaseRequest {
  readonly examTemplateId: string;
  readonly query: ExamTemplateWithRelationsQuery;
}

type GetExamTemplateByIdUseCaseResponse = Either<null, null>;

export class GetExamTemplateByIdUseCase {
  constructor(private examTemplatesRepository: ExamTemplatesRepository) {}

  async execute({
    examTemplateId,
    query,
  }: GetExamTemplateByIdUseCaseRequest): Promise<GetExamTemplateByIdUseCaseResponse> {
    const { fields, include } = query;

    const examTemplateWithRelations =
      await this.examTemplatesRepository.findWithRelationsById(examTemplateId, {
        fields,
        include,
      });

    return right(null);
  }
}
