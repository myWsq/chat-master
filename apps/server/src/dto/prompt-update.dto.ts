import { z } from 'zod';
import { createSchemaModel } from '../../utils/create-schema-model';

export class PromptUpdateDTO extends createSchemaModel(
  z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
  }),
) {}
