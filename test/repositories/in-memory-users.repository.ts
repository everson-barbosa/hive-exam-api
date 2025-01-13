import { Pagination } from '@/core/repositories/pagination';
import { UsersRepository } from '@/domain/exams/application/repositories/users.repository';
import { User } from '@/domain/exams/enterprise/entities/user.entity';

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];

  async create(user: User): Promise<void> {
    this.items.push(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => item.email === email);

    return user;
  }

  async findMany(pagination: Pagination): Promise<User[]> {
    const { page, perPage } = pagination;
    const users = this.items.slice((page - 1) * 20, page * perPage);

    return users;
  }
}
