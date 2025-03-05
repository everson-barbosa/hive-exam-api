import {
  Attachment,
  AttachmentProps,
} from '@/domain/exams/enterprise/entities/attachment.entity';
import { faker } from '@faker-js/faker/.';

export function makeAttachment(override: Partial<AttachmentProps>) {
  const attachment = Attachment.create({
    title: faker.book.title(),
    url: faker.internet.url(),
    ...override,
  });

  return attachment;
}
