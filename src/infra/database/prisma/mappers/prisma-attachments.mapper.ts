import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Attachment } from '@/domain/exams/enterprise/entities/attachment.entity';
import { Attachment as PrismaAttachment } from '@prisma/client';

export class PrismaAttachmentsMapper {
  static toPrisma(raw: Attachment): PrismaAttachment {
    return {
      title: raw.title,
      url: raw.url,
      id: raw.id.toString(),
    };
  }

  static toDomain(raw: PrismaAttachment): Attachment {
    return Attachment.create(
      {
        title: raw.title,
        url: raw.url,
      },
      new UniqueEntityID(raw.id),
    );
  }
}
