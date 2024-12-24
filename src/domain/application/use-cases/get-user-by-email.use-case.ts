import { Either, left, right } from 'src/core/either';
import { ResourceNotFound } from './errors/resource-not-found.error';
import { User } from '@/domain/enterprise/entities/user.entity';
import { UsersRepository } from '../repositories/users.repository';
import { Injectable } from '@nestjs/common';

interface GetUserByEmailUseCaseRequest {
  email: string;
}

type GetUserByEmailUseCaseResponse = Either<
  ResourceNotFound,
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
      return left(new ResourceNotFound());
    }

    return right({ user });
  }
}
