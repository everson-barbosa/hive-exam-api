import { WatchedList } from '@/core/entities/watched-list';
import { ExamApplicationParticipant } from './exam-application-participant.entity';

export class ExamApplicationParticipantList extends WatchedList<ExamApplicationParticipant> {
  compareItems(a: ExamApplicationParticipant, b: ExamApplicationParticipant) {
    return a.id.equals(b.id);
  }
}
