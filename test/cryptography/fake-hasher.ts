import { HashComparer } from '@/domain/exams/application/cryptography/hash-comparer';
import { HashGenerator } from '@/domain/exams/application/cryptography/hash-generator';

export class FakeHasher implements HashGenerator, HashComparer {
  async compare(plain: string, hash: string): Promise<boolean> {
    const hashedValue = `hashed-${plain}`;

    return hashedValue === hash;
  }

  async hash(plain: string): Promise<string> {
    return `hashed-${plain}`;
  }
}
