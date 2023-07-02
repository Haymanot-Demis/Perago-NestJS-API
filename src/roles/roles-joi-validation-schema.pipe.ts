import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';

export class RolesJoiValidationPipe implements PipeTransform {
  constructor(private objectSchema: ObjectSchema) {}
  transform(Inputvalue: any, metadata: ArgumentMetadata) {
    const { error, value } = this.objectSchema.validate(Inputvalue, {
      abortEarly: true,
    });

    if (error) {
      throw new BadRequestException('Validation failed ' + error.message);
    }

    return Inputvalue;
  }
}
