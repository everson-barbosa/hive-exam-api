import { UseCaseError } from '@/core/use-cases/use-case-error';

export class InvalidAttachmentTypeError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`Attachment type ${identifier} is invalid`);
  }
}
