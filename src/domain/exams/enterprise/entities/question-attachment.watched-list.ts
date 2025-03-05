import { WatchedList } from '@/core/entities/watched-list';
import { QuestionAttachment } from './question-attachment.entity';

export class QuestionAttachmentList extends WatchedList<QuestionAttachment> {
  compareItems(a: QuestionAttachment, b: QuestionAttachment): boolean {
    return a.id.equals(b.id);
  }
}
