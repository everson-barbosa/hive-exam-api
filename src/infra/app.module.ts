import { Module } from '@nestjs/common';
import { HttpModule } from './http/http.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [HttpModule, AuthModule],
})
export class AppModule {}
