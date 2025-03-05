import { QuestionAttachment } from '@/domain/exams/enterprise/entities/question-attachment.entity';
import { Prisma } from '@prisma/client';

export class PrismaQuestionAttachmentMapper {
  static toCreateMany(
    questionAttachments: QuestionAttachment[],
  ): Prisma.QuestionAttachmentUpdateManyArgs {
    const questionId = questionAttachments[0].questionId.toString();

    const attachmentIds = questionAttachments.map((questionAttachment) =>
      questionAttachment.attachmentId.toString(),
    );

    return {
      data: {
        questionId,
      },
      where: {
        attachmentId: {
          in: attachmentIds,
        },
      },
    };
  }
}
