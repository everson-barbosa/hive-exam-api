import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

interface QuestionProps {
  authorId: UniqueEntityID;
  subjectId: UniqueEntityID;
  enunciation: string;
}

export class Question extends Entity<QuestionProps> {
  static create(props: QuestionProps, id?: UniqueEntityID) {
    const question = new Question(
      {
        ...props,
      },
      id,
    );

    return question;
  }
}
