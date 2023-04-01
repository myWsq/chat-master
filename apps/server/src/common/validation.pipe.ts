import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { SchemaModelImpl } from '../../utils/create-schema-model';
import { ZodError } from 'zod';

@Injectable()
export class ValidationPipe implements PipeTransform {
  private _formatError(error: unknown) {
    if (error instanceof ZodError) {
      return error.issues
        .map((val, i) => {
          const pathStr = val.path.length ? `[${val.path.join('.')}]` : '';
          return `#${i + 1}:${pathStr} ${val.message}`;
        })
        .join(' ~ ');
    } else {
      return String(error);
    }
  }

  public transform(value: unknown, metadata: ArgumentMetadata): unknown {
    const metatype = metadata?.metatype as SchemaModelImpl<any, any, any>;

    if (!metatype.isSchemaModel) {
      return value;
    }

    try {
      return new metatype(value);
    } catch (error) {
      throw new BadRequestException(this._formatError(error), {
        cause: error,
      });
    }
  }
}
