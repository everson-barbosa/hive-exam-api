import { AggregateRoot } from '@/core/entities/aggregate-root';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { QuestionAttachmentList } from './question-attachment.watched-list';
import { Optional } from '@/core/types/optional';

interface QuestionProps {
  authorId: UniqueEntityID;
  enunciation: string;
  attachments: QuestionAttachmentList;
}

export class Question extends AggregateRoot<QuestionProps> {
  get authorId() {
    return this.props.authorId;
  }

  get enunciation() {
    return this.props.enunciation;
  }

  get attachments() {
    return this.props.attachments;
  }

  static create(
    props: Optional<QuestionProps, 'attachments'>,
    id?: UniqueEntityID,
  ) {
    const question = new Question(
      {
        ...props,
        attachments: props.attachments ?? new QuestionAttachmentList([]),
      },
      id,
    );

    return question;
  }
}
