import { QuestionAttachmentsRepository } from '@/domain/exams/application/repositories/question-attachments.repository';
import { QuestionAttachment } from '@/domain/exams/enterprise/entities/question-attachment.entity';
import { PrismaService } from '../prisma.service';
import { PrismaQuestionAttachmentMapper } from '../mappers/prisma-question-attachments.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaQuestionAttachmentsRepository
  implements QuestionAttachmentsRepository
{
  constructor(private prismaService: PrismaService) {}

  async createMany(questionAttachments: QuestionAttachment[]): Promise<void> {
    if (questionAttachments.length === 0) return;

    const data =
      PrismaQuestionAttachmentMapper.toCreateMany(questionAttachments);

    await this.prismaService.questionAttachment.updateMany(data);
  }

  async deleteMany(questionAttachments: QuestionAttachment[]): Promise<void> {
    if (questionAttachments.length === 0) return;

    const attachmentIds = questionAttachments.map((questionAttachment) =>
      questionAttachment.id.toString(),
    );

    await this.prismaService.questionAttachment.deleteMany({
      where: {
        attachmentId: {
          in: attachmentIds,
        },
      },
    });
  }
}
