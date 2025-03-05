import { AttachmentsRepository } from '@/domain/exams/application/repositories/attachments.repository';
import { Attachment } from '@/domain/exams/enterprise/entities/attachment.entity';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaAttachmentsMapper } from '../mappers/prisma-attachments.mapper';

@Injectable()
export class PrismaAttachmentsRepository implements AttachmentsRepository {
  constructor(private prismaService: PrismaService) {}

  async create(attachment: Attachment): Promise<void> {
    const data = PrismaAttachmentsMapper.toPrisma(attachment);

    await this.prismaService.attachment.create({ data });
  }
}
