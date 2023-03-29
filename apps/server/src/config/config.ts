import { z } from 'zod';

export const ConfigSchema = z.object({
  MEILISEARCH_ENDPOINT: z.string().nonempty(),
  MEILISEARCH_MASTER_KEY: z.string().nonempty(),
  JWT_SECRET_KEY: z.string().nonempty(),
  ADMIN_TOKEN: z.string().nonempty(),
});

export type Config = z.infer<typeof ConfigSchema>;

export function validate(config: unknown) {
  const result = ConfigSchema.safeParse(config);
  if (!result.success) {
    console.error(result.error.issues);
    throw new Error(`Invalid environment variables`);
  }
  return result.data;
}
