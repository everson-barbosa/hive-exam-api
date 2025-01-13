import { UseCaseError } from '@/core/use-cases/use-case-error';

export class WrongCredentialsError extends Error implements UseCaseError {
  constructor() {
    super('Wrong credentials');
  }
}
