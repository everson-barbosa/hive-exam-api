import { Either, left, right } from 'src/core/either';
import { ResourceNotFoundError } from '@/core/use-cases/errors/resource-not-found.error';
import { User } from '@/domain/exams/enterprise/entities/user.entity';
import { UsersRepository } from '../repositories/users.repository';
import { Injectable } from '@nestjs/common';

interface GetUserByEmailUseCaseRequest {
  email: string;
}

type GetUserByEmailUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    user: User;
  }
>;

@Injectable()
export class GetUserByEmailUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
  }: GetUserByEmailUseCaseRequest): Promise<GetUserByEmailUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      return left(new ResourceNotFoundError());
    }

    return right({ user });
  }
}
