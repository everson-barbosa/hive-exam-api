import { Injectable } from '@nestjs/common';
import { User } from '@/domain/enterprise/entities/user.entity';
import { PaginationParams } from '@/core/repositories/Pagination';

@Injectable()
export abstract class UsersRepository {
  abstract create(user: User): Promise<void>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findMany(params: PaginationParams): Promise<User[]>;
}
