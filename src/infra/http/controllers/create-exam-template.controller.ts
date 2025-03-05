import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateExamTemplateUseCase } from '@/domain/exams/application/use-cases/create-exam-template.use-case';
import { CurrentUser } from '@/infra/auth/current-user.decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { ExamTemplatePresenter } from '../presenters/exam-template.presenter';
import { z } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';

const createExamTemplateBodySchema = z.object({
  title: z.string(),
  questionIds: z.array(z.string()),
});

type CreateExamTemplateBodySchema = z.infer<
  typeof createExamTemplateBodySchema
>;

@ApiTags('exam templates')
@Controller('/exam-templates')
export class CreateExamTemplateController {
  constructor(private createExamTemplateUseCase: CreateExamTemplateUseCase) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createExamTemplateBodySchema))
  async handle(
    @Body() body: CreateExamTemplateBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    console.log(body);

    const { title, questionIds } = body;

    const result = await this.createExamTemplateUseCase.execute({
      authorId: user.sub,
      title,
      questionIds,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    return {
      examTemplate: ExamTemplatePresenter.toHTTP(result.value.examTemplate),
    };
  }
}
