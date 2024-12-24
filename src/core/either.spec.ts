import { Either, left, right } from './either';

const mockFunction = (shouldBeSuccess: boolean): Either<string, number> => {
  if (shouldBeSuccess) {
    return right(20);
  } else {
    return left('20');
  }
};

test('success result', () => {
  const result = mockFunction(true);

  expect(result.isRight()).toBe(true);
  expect(result.isLeft()).toBe(false);
});

test('error result', () => {
  const result = mockFunction(false);

  expect(result.isLeft()).toBe(true);
  expect(result.isRight()).toBe(false);
});
