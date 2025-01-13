import { Either, left, right } from '@/core/either';
import { NotificationsRepository } from '../repositories/notifications.repository';
import { ResourceNotFoundError } from '@/core/use-cases/errors/resource-not-found.error';
import { NotAllowedError } from '@/core/use-cases/errors/not-allowed.error';
import { Notification } from '../../enterprise/entities/notification.entity';

interface ReadNotificationRequest {
  readonly id: string;
  readonly recipientId: string;
}

type ReadNotificationResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  { notification: Notification }
>;

export class ReadNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({
    id,
    recipientId,
  }: ReadNotificationRequest): Promise<ReadNotificationResponse> {
    const notification = await this.notificationsRepository.findById(id);

    if (!notification) {
      return left(new ResourceNotFoundError());
    }

    if (notification.recipientId.toString() !== recipientId) {
      return left(new NotAllowedError());
    }

    notification.read();

    await this.notificationsRepository.save(notification);

    return right({ notification });
  }
}
