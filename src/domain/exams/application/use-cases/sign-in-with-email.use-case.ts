import { Either, left, right } from '@/core/either';
import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/users.repository';
import { HashComparer } from '../cryptography/hash-comparer';
import { Encrypter } from '../cryptography/encrypter';
import { WrongCredentialsError } from './errors/wrong-credentials.error';

interface SignInUseWithEmailCaseRequest {
  email: string;
  password: string;
}

type SignInWithEmailUseCaseResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string;
  }
>;

@Injectable()
export class SignInWithEmailUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: SignInUseWithEmailCaseRequest): Promise<SignInWithEmailUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      return left(new WrongCredentialsError());
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      return left(new WrongCredentialsError());
    }

    const accessToken = await this.encrypter.encrypt({
      sub: user.id.toString(),
      email: user.email,
      name: user.name,
    });

    return right({
      accessToken,
    });
  }
}
