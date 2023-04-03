import { z } from 'zod';
import { createSchemaModel } from '../../utils/create-schema-model';

export class RegisterDTO extends createSchemaModel(
  z.object({
    tag: z.string(),
    quota: z.number(),
  }),
) {}
