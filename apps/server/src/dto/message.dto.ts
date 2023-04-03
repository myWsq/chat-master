import { z } from 'zod';
import { createSchemaModel } from '../../utils/create-schema-model';
import { MessageEntity } from '../aggregates/message/message.entity';

export class MessageDTO extends createSchemaModel(
  z.object({
    id: z.string(),
    role: z.string(),
    content: z.string(),
    sessionId: z.string(),
    promptId: z.string(),
    createdAt: z.date(),
  }),
) {
  static fromEntity(entity: MessageEntity) {
    return new MessageDTO(entity);
  }
}
