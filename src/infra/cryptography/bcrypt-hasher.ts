import { hash, compare } from 'bcryptjs';

import { HashComparer } from '@/domain/exams/application/cryptography/hash-comparer';
import { HashGenerator } from '@/domain/exams/application/cryptography/hash-generator';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BcryptHasher implements HashGenerator, HashComparer {
  private HASH_SALT_LENGTH = 8;

  hash(plain: string): Promise<string> {
    return hash(plain, this.HASH_SALT_LENGTH);
  }

  compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash);
  }
}
