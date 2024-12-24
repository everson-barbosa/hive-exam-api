import { GetUserByEmailUseCase } from '@/domain/application/use-cases/get-user-by-email.use-case';
import { DatabaseModule } from '../database/database.module';
import { Module } from '@nestjs/common';
import { GetUserByEmailController } from './controllers/users/get-user-by-email.controller';
import { SignInWithEmailController } from './controllers/auth/sign-in-with-email.controller';
import { SignInWithEmailUseCase } from '@/domain/application/use-cases/sign-in-with-email.use-case';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { SignUpController } from './controllers/auth/sign-up.controller';
import { SignUpUseCase } from '@/domain/application/use-cases/sign-up.use-case';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    GetUserByEmailController,
    SignInWithEmailController,
    SignUpController,
  ],
  providers: [GetUserByEmailUseCase, SignInWithEmailUseCase, SignUpUseCase],
})
export class HttpModule {}
