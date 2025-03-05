import { Injectable } from '@nestjs/common';
import { QuestionAttachment } from '../../enterprise/entities/question-attachment.entity';

@Injectable()
export abstract class QuestionAttachmentsRepository {
  abstract createMany(questionAttachments: QuestionAttachment[]): Promise<void>;
  abstract deleteMany(questionAttachments: QuestionAttachment[]): Promise<void>;
}
