import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class HashGenerator {
  abstract hash(plain: string): Promise<string>;
}
