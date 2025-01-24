import { FetchExamTemplatesUseCase } from '@/domain/exams/application/use-cases/fetch-exam-templates.use-case';
import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { FetchExamTemplatesDto } from '../../dtos/exam-templates/fetch-exam-templates.dto';

@Controller('/exam-templates')
export class FetchExamTemplatesController {
  constructor(private fetchExamTemplatesUseCase: FetchExamTemplatesUseCase) {}

  @HttpCode(200)
  @Get('/')
  async handle(@Param() param: FetchExamTemplatesDto) {
    console.log({ param });

    // const response = await this.fetchExamTemplatesUseCase.execute();
  }
}
