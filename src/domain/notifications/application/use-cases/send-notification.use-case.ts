import { Either, right } from '@/core/either';
import { NotificationsRepository } from '../repositories/notifications.repository';
import { Notification } from '../../enterprise/entities/notification.entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

interface SendNotificationRequest {
  readonly recipientId: string;
  readonly title: string;
  readonly content: string;
}

type SendNotificationResponse = Either<
  null,
  {
    notification: Notification;
  }
>;

export class SendNotificationUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({
    recipientId,
    title,
    content,
  }: SendNotificationRequest): Promise<SendNotificationResponse> {
    const notification = Notification.create({
      recipientId: new UniqueEntityID(recipientId),
      title,
      content,
    });

    await this.notificationsRepository.create(notification);

    return right({ notification });
  }
}
