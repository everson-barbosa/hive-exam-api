import { Fields } from '@/core/repositories/fields';
import { UserWithRelations, UserWithRelationsQuery } from './user.relations';
import { Query } from '@/core/repositories/query';

export interface QuestionBody {
  enunciation: string;
}

export interface QuestionRelations {
  author: UserWithRelations;
}

export interface QuestionWithRelations
  extends QuestionBody,
    QuestionRelations {}

export type QuestionWithRelationsFields = Fields<QuestionBody>;

export type QuestionWithRelationsInclude = {
  author?: UserWithRelationsQuery;
};

export type QuestionWithRelationsQuery = Query<
  QuestionWithRelationsFields,
  QuestionWithRelationsInclude
>;
