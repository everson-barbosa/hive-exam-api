import { PaginationParams } from '@/core/repositories/Pagination';
import { UsersRepository } from '@/domain/application/repositories/users.repository';
import { User } from '@/domain/enterprise/entities/user.entity';

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];

  async create(user: User): Promise<void> {
    this.items.push(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => item.email === email);

    return user;
  }

  async findMany(params: PaginationParams): Promise<User[]> {
    const { page, perPage } = params;
    const users = this.items.slice((page - 1) * 20, page * perPage);

    return users;
  }
}
