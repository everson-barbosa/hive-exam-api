import { Fields } from '@/core/repositories/fields';
import { ExamTemplateBody } from './exam-template.relations';
import { QuestionBody, QuestionWithRelationsQuery } from './question.relations';
import { Query } from '@/core/repositories/query';

export interface ExamTemplateQuestionBody {
  examTemplateId: string;
  questionId: string;
}

export interface ExamTemplateQuestionRelations {
  examTemplate: ExamTemplateBody;
  question: QuestionBody;
}

export interface ExamTemplateQuestionWithRelations
  extends ExamTemplateQuestionBody,
    ExamTemplateQuestionRelations {}

export type ExamTemplateQuestionWithRelationsFields =
  Fields<ExamTemplateQuestionBody>;

export type ExamTemplateQuestionWithRelationsInclude = {
  question?: QuestionWithRelationsQuery;
};

export type ExamTemplateQuestionWithRelationsQuery = Query<
  ExamTemplateQuestionWithRelationsFields,
  ExamTemplateQuestionWithRelationsInclude
>;
