import { Entity } from '@/core/entities/entity';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

interface ExamTemplateQuestionProps {
  questionId: UniqueEntityID;
  examTemplateId: UniqueEntityID;
}

export class ExamTemplateQuestion extends Entity<ExamTemplateQuestionProps> {
  static create(props: ExamTemplateQuestionProps, id?: UniqueEntityID) {
    const examTemplateQuestion = new ExamTemplateQuestion(
      {
        ...props,
      },
      id,
    );

    return examTemplateQuestion;
  }
}
