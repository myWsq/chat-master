import { z } from 'zod';
import { createSchemaModel } from '../../utils/create-schema-model';

export class MessageCreateDTO extends createSchemaModel(
  z.object({
    promptId: z.string(),
    sessionId: z.string().optional(),
    content: z.string(),
  }),
) {}
