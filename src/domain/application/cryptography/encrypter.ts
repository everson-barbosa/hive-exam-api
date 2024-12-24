import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class Encrypter {
  abstract encrypt(payload: Record<string, unknown>): Promise<string>;
}
