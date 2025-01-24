import { z } from 'zod';

export const envSchema = z.object({
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  PORT: z.coerce.number().optional().default(3333),
});

export type EnvSchema = z.infer<typeof envSchema>;
