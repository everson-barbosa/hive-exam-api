import { GetUserByEmailUseCase } from '@/domain/exams/application/use-cases/get-user-by-email.use-case';
import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { UserPresenter } from '../../presenters/user.presenter';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('/users/:email')
export class GetUserByEmailController {
  constructor(private getUserByEmailUseCase: GetUserByEmailUseCase) {}

  @Get('/')
  async handle(@Param('email') email: string) {
    const result = await this.getUserByEmailUseCase.execute({ email });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    return UserPresenter.toHTTP(result.value.user);
  }
}
