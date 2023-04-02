import { ZodType, ZodTypeDef } from 'zod';

export interface SchemaModelImpl<
  Output extends Record<string, unknown>,
  Def extends ZodTypeDef,
  Input,
> {
  isSchemaModel: true;
  schema: ZodType<Output, Def, Input>;
  new (input: Input): Output;
}

export function createSchemaModel<
  Output extends Record<string, unknown>,
  Def extends ZodTypeDef,
  Input,
>(schema: ZodType<Output, Def, Input>) {
  class AugmentedDTO {
    static isSchemaModel = true as const;
    static schema = schema;
    constructor(input: Input) {
      Object.assign(this, schema.parse(input));
    }
  }

  return AugmentedDTO as SchemaModelImpl<Output, Def, Input>;
}
