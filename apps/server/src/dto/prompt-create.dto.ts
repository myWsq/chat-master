import { z } from 'zod';
import { createSchemaModel } from '../../utils/create-schema-model';

export class PromptCreateDTO extends createSchemaModel(
  z.object({
    title: z.string(),
    content: z.string(),
  }),
) {}
