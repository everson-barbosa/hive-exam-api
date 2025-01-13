import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

interface QuestionOptionProps {
  description: string;
}

export class QuestionOption extends Entity<QuestionOptionProps> {
  static create(props: QuestionOptionProps, id?: UniqueEntityID) {
    const questionOption = new QuestionOption(
      {
        ...props,
      },
      id ?? new UniqueEntityID(),
    );

    return questionOption;
  }
}
