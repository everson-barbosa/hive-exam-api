import { FetchExamTemplatesUseCase } from '@/domain/exams/application/use-cases/fetch-exam-templates.use-case';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';
import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  Query,
  UsePipes,
} from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { z } from 'zod';
import { ExamTemplatePresenter } from '../presenters/exam-template.presenter';
import { FETCH_EXAM_TEMPLATES_SWAGGER } from '../swaggers/fetch-exam-templates.api-response';

const fetchExamTemplatesQuerySchema = z.object({
  order: z.enum(['asc', 'desc']).default('asc'),
  orderBy: z.enum(['createdAt', 'status', 'updatedAt']),
  page: z
    .string()
    .optional()
    .default('1')
    .transform(Number)
    .pipe(z.number().min(1)),
  perPage: z
    .string()
    .optional()
    .default('10')
    .transform(Number)
    .pipe(z.number().min(10)),
});

type FetchExamTemplatesQuerySchema = z.infer<
  typeof fetchExamTemplatesQuerySchema
>;

@ApiTags('exam templates')
@Controller('/exam-templates')
export class FetchExamTemplatesController {
  constructor(private fetchExamTemplatesUseCase: FetchExamTemplatesUseCase) {}

  @HttpCode(200)
  @Get('/')
  @UsePipes(new ZodValidationPipe(fetchExamTemplatesQuerySchema))
  @ApiQuery(FETCH_EXAM_TEMPLATES_SWAGGER.query.order)
  @ApiQuery(FETCH_EXAM_TEMPLATES_SWAGGER.query.orderBy)
  @ApiQuery(FETCH_EXAM_TEMPLATES_SWAGGER.query.page)
  @ApiQuery(FETCH_EXAM_TEMPLATES_SWAGGER.query.perPage)
  @ApiResponse(FETCH_EXAM_TEMPLATES_SWAGGER.response.success)
  @ApiResponse(FETCH_EXAM_TEMPLATES_SWAGGER.response.badRequest)
  async handle(@Query() query: FetchExamTemplatesQuerySchema) {
    const { order, orderBy, page, perPage } = query;

    const result = await this.fetchExamTemplatesUseCase.execute({
      order,
      orderBy,
      page,
      perPage,
      statuses: [],
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    return {
      examTemplates: result.value.examTemplates.map(
        ExamTemplatePresenter.toHTTP,
      ),
    };
  }
}
