import { UseCaseError } from '@/core/use-cases/use-case-error';

export class ResourceNotFoundError extends Error implements UseCaseError {
  constructor() {
    super('Resource not found');
  }
}
