import { z } from 'zod';
import { createSchemaModel } from '../../utils/create-schema-model';
import { UserEntity } from '../aggregates/user/user.entity';

export class UserDTO extends createSchemaModel(
  z.object({
    id: z.string(),
    apiKey: z.string(),
    tag: z.string(),
    quota: z.number(),
  }),
) {
  static fromEntity(entity: UserEntity) {
    return new UserDTO(entity);
  }
}
