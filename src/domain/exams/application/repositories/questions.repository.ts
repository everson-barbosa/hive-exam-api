import { Injectable } from '@nestjs/common';
import { Question } from '../../enterprise/entities/question.entity';

@Injectable()
export abstract class QuestionsRepository {
  abstract create(question: Question): Promise<void>;
  abstract save(question: Question): Promise<void>;
  abstract findById(id: string): Promise<Question | null>;
}
