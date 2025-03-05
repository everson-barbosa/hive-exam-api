import { QuestionsRepository } from '@/domain/exams/application/repositories/questions.repository';
import { Question } from '@/domain/exams/enterprise/entities/question.entity';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { QuestionAttachmentsRepository } from '@/domain/exams/application/repositories/question-attachments.repository';
import { PrismaQuestionsMapper } from '../mappers/prisma-questions.mapper';

@Injectable()
export class PrismaQuestionsRepository implements QuestionsRepository {
  constructor(
    private prismaService: PrismaService,
    private questionAttachmentsRepository: QuestionAttachmentsRepository,
  ) {}

  async create(question: Question): Promise<void> {
    const data = PrismaQuestionsMapper.toPrisma(question);

    await this.prismaService.question.create({
      data,
    });

    await this.questionAttachmentsRepository.createMany(
      question.attachments.getItems(),
    );
  }

  async save(question: Question): Promise<void> {
    const data = PrismaQuestionsMapper.toPrisma(question);

    await Promise.all([
      this.prismaService.question.update({
        data,
        where: {
          id: data.id,
        },
      }),
      this.questionAttachmentsRepository.createMany(
        question.attachments.getNewItems(),
      ),
      this.questionAttachmentsRepository.deleteMany(
        question.attachments.getRemovedItems(),
      ),
    ]);
  }

  async findById(id: string): Promise<Question | null> {
    const question = await this.prismaService.question.findUnique({
      where: {
        id,
      },
    });

    if (!question) return null;

    return PrismaQuestionsMapper.toData(question);
  }
}
