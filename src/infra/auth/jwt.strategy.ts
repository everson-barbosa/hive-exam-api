import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EnvSchema } from '../env';
import { z } from 'zod';
import { Injectable } from '@nestjs/common';

const tokenPayloadSchema = z.object({
  sub: z.string().regex(/^[a-f0-9]{24}$/i, {
    message: 'A string deve ser um hexadecimal de 24 caracteres.',
  }),
});

export type UserPayload = z.infer<typeof tokenPayloadSchema>;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService<EnvSchema, true>) {
    const publicKey = configService.get('JWT_PUBLIC_KEY', { infer: true });

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Buffer.from(publicKey, 'base64'),
      algorithms: ['RS256'],
    });
  }

  async validate(payload: UserPayload) {
    return tokenPayloadSchema.parse(payload);
  }
}
