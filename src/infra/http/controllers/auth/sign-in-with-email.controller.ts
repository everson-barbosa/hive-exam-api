import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common';
import { SignInWithEmailUseCase } from '@/domain/exams/application/use-cases/sign-in-with-email.use-case';
import { WrongCredentialsError } from '@/domain/exams/application/use-cases/errors/wrong-credentials.error';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@/infra/auth/public';
import { z } from 'zod';
import { ZodValidationPipe } from '@/infra/pipes/zod-validation-pipe';

const signInWithEmailBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type SignInWithEmailBodySchema = z.infer<typeof signInWithEmailBodySchema>;

@ApiTags('auth')
@Public()
@Controller('/sign-in:with-email')
export class SignInWithEmailController {
  constructor(private signInWithEmailUseCase: SignInWithEmailUseCase) {}

  @Post('/')
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(signInWithEmailBodySchema))
  async handle(@Body() body: SignInWithEmailBodySchema) {
    const { email, password } = body;

    const result = await this.signInWithEmailUseCase.execute({
      email,
      password,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }

    const { accessToken } = result.value;

    return {
      access_token: accessToken,
    };
  }
}
