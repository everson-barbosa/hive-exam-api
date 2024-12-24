import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInWithEmailDto } from '../../dtos/auth/sign-in-with-email.dto';
import { SignInWithEmailUseCase } from '@/domain/application/use-cases/sign-in-with-email.use-case';
import { WrongCredentialsError } from '@/domain/application/use-cases/errors/wrong-credentials.error';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@/infra/auth/public';

@ApiTags('auth')
@Public()
@Controller('/sign-in:with-email')
export class SignInWithEmailController {
  constructor(private signInWithEmailUseCase: SignInWithEmailUseCase) {}

  @Post('/')
  async handle(@Body() body: SignInWithEmailDto) {
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
