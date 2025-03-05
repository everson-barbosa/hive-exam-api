import { AggregateRoot } from '@/core/entities/aggregate-root';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { ExamApplicationParticipantList } from './exam-application-participant.watched-list';
import { Optional } from '@/core/types/optional';
import { OnAddParticipantToExamApplicationEvent } from '../events/on-add-participant-to-exam-application.event';

interface ExamApplicationProps {
  title: string;
  examTemplate: UniqueEntityID;
  participants: ExamApplicationParticipantList;
  startAt: Date;
  endAt: Date;
}

type CreateExamApplicationProps = Optional<
  ExamApplicationProps,
  'participants'
>;

export class ExamApplication extends AggregateRoot<ExamApplicationProps> {
  get title() {
    return this.props.title;
  }

  get participants() {
    return this.props.participants;
  }

  get startAt() {
    return this.props.startAt;
  }

  static create(props: CreateExamApplicationProps, id?: UniqueEntityID) {
    const examApplication = new ExamApplication(
      {
        ...props,
        participants: new ExamApplicationParticipantList([]),
      },
      id,
    );

    const isNewExamApplication = !id;

    if (isNewExamApplication) {
      examApplication.addDomainEvent(
        new OnAddParticipantToExamApplicationEvent(examApplication),
      );
    }

    return examApplication;
  }
}
