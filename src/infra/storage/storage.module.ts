import { Module } from '@nestjs/common';
import { Uploader } from '@/domain/exams/application/storage/uploader';
import { SupabaseUploader } from './supabase-upload';
import { EnvModule } from '../env/env.module';

@Module({
  imports: [EnvModule],
  providers: [
    {
      provide: Uploader,
      useClass: SupabaseUploader,
    },
  ],
  exports: [Uploader],
})
export class StorageModule {}
