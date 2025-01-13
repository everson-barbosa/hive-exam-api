import { Controller, Get } from '@nestjs/common';

@Controller('/exam-templates')
export class FetchExamTemplatesController {
  @Get('/')
  async handle() {}
}
