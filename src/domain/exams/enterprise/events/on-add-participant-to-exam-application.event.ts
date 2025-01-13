import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { DomainEvent } from '@/core/events/domain-event';
import { ExamApplication } from '../entities/exam-application.entity';

export class OnAddParticipantToExamApplicationEvent implements DomainEvent {
  public ocurredAt: Date;
  public examApplication: ExamApplication;

  getAggregateId(): UniqueEntityID {
    return this.examApplication.id;
  }

  constructor(examApplication: ExamApplication) {
    this.examApplication = examApplication;
    this.ocurredAt = new Date();
  }
}
