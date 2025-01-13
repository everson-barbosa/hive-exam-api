import { Pagination } from '@/core/repositories/pagination';
import { UsersRepository } from '@/domain/exams/application/repositories/users.repository';
import { User } from '@/domain/exams/enterprise/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaUsersMapper } from '../mappers/prisma-users.mapper';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prismaService: PrismaService) {}

  async create(user: User): Promise<void> {
    const data = PrismaUsersMapper.toPrisma(user);

    await this.prismaService.user.create({
      data,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prismaService.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    return PrismaUsersMapper.toDomain(user);
  }

  async findMany(pagination: Pagination): Promise<User[]> {
    const { page, perPage } = pagination;

    const users = await this.prismaService.user.findMany({
      take: perPage,
      skip: (page - 1) * perPage,
    });

    return users.map(PrismaUsersMapper.toDomain);
  }
}
