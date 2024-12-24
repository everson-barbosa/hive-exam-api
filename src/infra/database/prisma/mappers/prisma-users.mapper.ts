import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Role, User } from '@/domain/enterprise/entities/user.entity';
import { User as PrismaUser } from '@prisma/client';

export class PrismaUsersMapper {
  static toPrisma(raw: User): PrismaUser {
    return {
      id: raw.id.toString(),
      email: raw.email,
      name: raw.name,
      password: raw.password,
      role: raw.role,
    };
  }

  static toDomain(raw: PrismaUser): User {
    return User.create(
      {
        email: raw.email,
        name: raw.name,
        password: raw.password,
        role: Role[raw.role],
      },
      new UniqueEntityID(raw.id),
    );
  }
}
