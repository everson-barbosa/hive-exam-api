import { InMemoryUsersRepository } from "test/repositories/in-memory-users.repository"
import { GetUserByEmailUseCase } from "./get-user-by-email.use-case"
import { makeUser } from "test/factories/make-user"

describe('Domain: Seals: Use case: Get user by email', () => {
  let usersRepository: InMemoryUsersRepository
  let sut: GetUserByEmailUseCase

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserByEmailUseCase(usersRepository)
  })

  it('should be able find user by email', async () => {
    const user = makeUser()

    usersRepository.items.push(user)

    const response = await sut.execute({ email: user.email })

    expect(response.isRight()).toBeTruthy()
    expect(usersRepository.items).toHaveLength(1)
    expect(usersRepository.items[0].email).toEqual(user.email)
  })
})