import { faker } from '@faker-js/faker'
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Role, User, UserProps } from "@/domain/exams/enterprise/entities/user.entity";

export function makeUser(
  override: Partial<UserProps> = {},
  id?: UniqueEntityID
) {
  const user = User.create({
    email: faker.internet.email(),
    name: faker.person.fullName(),
    password: faker.internet.password(),
    role: Role.ADMIN,
    ...override,
  })

  return user
}