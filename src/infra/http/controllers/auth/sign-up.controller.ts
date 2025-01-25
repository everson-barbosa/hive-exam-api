import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common';
import { SignUpUseCase } from '@/domain/exams/application/use-cases/sign-up.use-case';
import { UserAlreadyExistsError } from '@/domain/exams/application/use-cases/errors/user-already-exists.error';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@/infra/auth/public';
import { z } from 'zod';
import { ZodValidationPipe } from '@/infra/pipes/zod-validation-pipe';

const signUpBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

type SignUpBodySchema = z.infer<typeof signUpBodySchema>;

@ApiTags('auth')
@Public()
@Controller('/sign-up')
export class SignUpController {
  constructor(private signUpUseCase: SignUpUseCase) {}

  @Post('/')
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(signUpBodySchema))
  async handle(@Body() body: SignUpBodySchema) {
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
