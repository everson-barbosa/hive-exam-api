import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

interface SubjectProps {
  title: string;
}

export class Subject extends Entity<SubjectProps> {
  get title() {
    return this.props.title;
  }

  static create(props: SubjectProps, id?: UniqueEntityID) {
    const subject = new Subject(
      {
        ...props,
      },
      id,
    );

    return subject;
  }
}
