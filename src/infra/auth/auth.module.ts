import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { EnvSchema } from '../env';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<EnvSchema, true>) => {
        const secret = configService.get('JWT_SECRET', { infer: true });

        return { secret };
      },
    }),
  ],
})
export class AuthModule {}
