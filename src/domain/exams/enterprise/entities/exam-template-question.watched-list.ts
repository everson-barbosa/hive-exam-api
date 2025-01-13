import { WatchedList } from '@/core/entities/watched-list';
import { ExamTemplateQuestion } from './exam-template-question.entity';

export class ExamTemplateQuestionList extends WatchedList<ExamTemplateQuestion> {
  compareItems(a: ExamTemplateQuestion, b: ExamTemplateQuestion): boolean {
    return a.id.equals(b.id);
  }
}
