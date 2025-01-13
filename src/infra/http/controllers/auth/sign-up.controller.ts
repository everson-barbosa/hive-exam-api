import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common';
import { SignUpUseCase } from '@/domain/exams/application/use-cases/sign-up.use-case';
import { SignUpDto } from '../../dtos/auth/sign-up.dto';
import { UserAlreadyExistsError } from '@/domain/exams/application/use-cases/errors/user-already-exists.error';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@/infra/auth/public';

@ApiTags('auth')
@Public()
@Controller('/sign-up')
export class SignUpController {
  constructor(private signUpUseCase: SignUpUseCase) {}

  @Post('/')
  @HttpCode(201)
  async handle(@Body() body: SignUpDto) {
    const { name, email, password } = body;

    const result = await this.signUpUseCase.execute({
      name,
      email,
      password,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case UserAlreadyExistsError:
          throw new ConflictException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }
  }
}
