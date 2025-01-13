import { Injectable } from '@nestjs/common';
import { User } from '@/domain/exams/enterprise/entities/user.entity';
import { Pagination } from '@/core/repositories/pagination';

@Injectable()
export abstract class UsersRepository {
  abstract create(user: User): Promise<void>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findMany(pagination: Pagination): Promise<User[]>;
}
