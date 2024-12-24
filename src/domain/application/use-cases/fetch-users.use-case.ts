import { Either, right } from "@/core/either";
import { User } from '@/domain/enterprise/entities/user.entity';
import { UsersRepository } from "../repositories/users.repository";
import { Injectable } from "@nestjs/common";

interface FetchUsersUseCaseRequest {
  readonly page: number,
  readonly perPage: number
}

type FetchUsersUseCaseResponse = Either<
  null,
  {
    users: User[]
  }
>

@Injectable()
export class FetchUsersUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ page, perPage }: FetchUsersUseCaseRequest): Promise<FetchUsersUseCaseResponse> {
    const users = await this.usersRepository.findMany({
      page,
      perPage
    })

    return right({ users })
  }
}