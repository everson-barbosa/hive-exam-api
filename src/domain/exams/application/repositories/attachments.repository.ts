import { Attachment } from '../../enterprise/entities/attachment.entity';

export abstract class AttachmentsRepository {
  abstract create(attachment: Attachment): Promise<void>;
}
