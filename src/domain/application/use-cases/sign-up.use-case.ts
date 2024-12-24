import { Either, left, right } from '@/core/either';
import { Injectable } from '@nestjs/common';
import { Role, User } from '../../enterprise/entities/user.entity';
import { UsersRepository } from '../repositories/users.repository';
import { HashGenerator } from '../cryptography/hash-generator';
import { UserAlreadyExistsError } from './errors/user-already-exists.error';

interface SignUpUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

type SignUpUseCaseResponse = Either<
  UserAlreadyExistsError,
  {
    user: User;
  }
>;

@Injectable()
export class SignUpUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    email,
    password,
  }: SignUpUseCaseRequest): Promise<SignUpUseCaseResponse> {
    const studentWithSameEmail = await this.usersRepository.findByEmail(email);

    if (studentWithSameEmail) {
      return left(new UserAlreadyExistsError(email));
    }

    const hashedPassword = await this.hashGenerator.hash(password);

    const user = User.create({
      name,
      email,
      password: hashedPassword,
      role: Role.USER,
    });

    await this.usersRepository.create(user);

    return right({
      user,
    });
  }
}
