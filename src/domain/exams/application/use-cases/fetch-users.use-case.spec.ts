import { InMemoryUsersRepository } from 'test/repositories/in-memory-users.repository';
import { FetchUsersUseCase } from './fetch-users.use-case';
import { makeUser } from 'test/factories/make-user';

describe('Domain: Seals: Use case: Fetch users', () => {
  let usersRepository: InMemoryUsersRepository;
  let sut: FetchUsersUseCase;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new FetchUsersUseCase(usersRepository);
  });

  it('should be able fetch paginated users', async () => {
    const perPage = 20;

    for (let i = 1; i <= perPage + 2; i++) {
      usersRepository.items.push(makeUser());
    }

    const response = await sut.execute({ page: 2, perPage });

    expect(response.isRight()).toBeTruthy();
    expect(response.value.users).toHaveLength(2);
  });
});
