import { InternalServerErrorException } from '@nestjs/common';
import { ZodType, ZodTypeDef } from 'zod';

export interface SchemaModelImpl<
  Output extends Record<string, unknown>,
  Def extends ZodTypeDef,
  Input,
> {
  isDTO: true;
  schema: ZodType<Output, Def, Input>;
  new (input: Input): Output;
}

export function createSchemaModel<
  Output extends Record<string, unknown>,
  Def extends ZodTypeDef,
  Input,
>(schema: ZodType<Output, Def, Input>) {
  class AugmentedDTO {
    static isDTO = true as const;
    static schema = schema;
    constructor(input: Input) {
      try {
        Object.assign(this, schema.parse(input));
      } catch (error) {
        throw new InternalServerErrorException('Schema model parsed failed', {
          cause: error,
        });
      }
    }
  }

  return AugmentedDTO as SchemaModelImpl<Output, Def, Input>;
}
