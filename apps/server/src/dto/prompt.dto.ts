import { z } from 'zod';
import { createSchemaModel } from '../../utils/create-schema-model';
import { PromptEntity } from '../aggregates/prompt/prompt.entity';

export class PromptDTO extends createSchemaModel(
  z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
    userId: z.string(),
    updatedAt: z.coerce.date(),
  }),
) {
  static fromEntity(entity: PromptEntity) {
    return new PromptDTO({
      id: entity.id,
      title: entity.title,
      content: entity.content,
      userId: entity.userId,
      updatedAt: entity.updatedAt,
    });
  }
}
