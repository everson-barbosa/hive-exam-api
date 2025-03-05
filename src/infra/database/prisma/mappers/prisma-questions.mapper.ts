import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Question } from '@/domain/exams/enterprise/entities/question.entity';
import { Question as PrismaQuestion } from '@prisma/client';

export class PrismaQuestionsMapper {
  static toPrisma(raw: Question): PrismaQuestion {
    return {
      id: raw.id.toString(),
      enunciation: raw.enunciation,
      authorId: raw.authorId.toString(),
    };
  }

  static toData(raw: PrismaQuestion): Question {
    return Question.create({
      authorId: new UniqueEntityID(raw.authorId),
      enunciation: raw.enunciation,
    });
  }
}
