import { z } from 'zod';
import { createSchemaModel } from '../../utils/create-schema-model';

export class RegistrationDTO extends createSchemaModel(
  z.object({
    userId: z.string(),
    token: z.string(),
    expiredAt: z.date(),
  }),
) {}
