import { AggregateRoot } from '@/core/entities/aggregate-root';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { ExamTemplateQuestionList } from './exam-template-question.watched-list';
import { Optional } from '@/core/types/optional';

export type ExamTemplateOrdernationProps = keyof Pick<
  ExamTemplate,
  'status' | 'createdAt' | 'updatedAt'
>;

export enum ExamTemplateStatus {
  CREATED,
  PUBLISHED,
  ARCHIVED,
}

interface ExamTemplateProps {
  authorId: UniqueEntityID;
  title: string;
  status: ExamTemplateStatus;
  questions: ExamTemplateQuestionList;
  createdAt: Date;
  updatedAt: Date | null;
}

type CreateExamTemplateProps = Optional<
  ExamTemplateProps,
  'questions' | 'updatedAt' | 'createdAt'
>;

export class ExamTemplate extends AggregateRoot<ExamTemplateProps> {
  get authorId() {
    return this.props.authorId;
  }

  set authorId(authorId: UniqueEntityID) {
    this.props.authorId = authorId;
  }

  get title() {
    return this.props.title;
  }

  set title(title: string) {
    this.props.title = title;
    this.touch();
  }

  get questions() {
    return this.props.questions;
  }

  set questions(questions: ExamTemplateQuestionList) {
    this.props.questions = questions;
    this.touch();
  }

  get status() {
    return this.props.status;
  }

  set status(status: ExamTemplateStatus) {
    this.props.status = status;
    this.touch();
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  static create(props: CreateExamTemplateProps, id?: UniqueEntityID) {
    const examTemplate = new ExamTemplate(
      {
        ...props,
        questions: props.questions ?? new ExamTemplateQuestionList([]),
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? null,
      },
      id,
    );

    return examTemplate;
  }
}
