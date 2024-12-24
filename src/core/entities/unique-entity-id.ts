import { randomBytes } from 'node:crypto';

export class UniqueEntityID {
  private value: string;

  toString() {
    return this.value;
  }

  toValue() {
    return this.value;
  }

  public equals(id: UniqueEntityID) {
    return id.toValue() === this.value;
  }

  constructor(value?: string) {
    this.value = value ?? randomBytes(12).toString('hex');
  }
}
