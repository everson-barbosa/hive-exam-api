import { Fields } from '@/core/repositories/fields';
import { Query } from '@/core/repositories/query';

export interface UserBody {
  id: string;
  name: string;
  email: string;
}

export interface UserWithRelations extends UserBody {}

export type UserWithRelationsFields = Fields<UserBody>;

export type UserWithRelationsQuery = Query<UserWithRelationsFields, null>;
