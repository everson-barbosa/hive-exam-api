import { EventHandler } from '@/core/events/event-handler';
import { SendNotificationUseCase } from '../use-cases/send-notification.use-case';
import { DomainEvents } from '@/core/events/domain-events';
import { OnAddParticipantToExamApplicationEvent } from '@/domain/exams/enterprise/events/on-add-participant-to-exam-application.event';

export class OnAddParticipantToExamApplicationSubscriber
  implements EventHandler
{
  constructor(private sendNotificationUseCase: SendNotificationUseCase) {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.handler,
      OnAddParticipantToExamApplicationEvent.name,
    );
  }

  private async handler({
    examApplication,
  }: OnAddParticipantToExamApplicationEvent) {
    const participants = examApplication.participants.getItems();

    await Promise.allSettled(
      participants.map((participant) =>
        this.sendNotificationUseCase.execute({
          title: `New exam scheduled ${examApplication.title}`,
          content: `Your new exam, ${examApplication.title}, is scheduled for ${examApplication.startAt.toISOString()}. Check the details and get prepared!`,
          recipientId: participant.id.toString(),
        }),
      ),
    );
  }
}
