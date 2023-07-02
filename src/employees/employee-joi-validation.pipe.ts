import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private objectSchema: ObjectSchema) {}
  transform(Inputvalue: any, metadata: ArgumentMetadata) {
    const { error, value } = this.objectSchema.validate(Inputvalue, {
      abortEarly: true,
      allowUnknown: true,
    });

    if (error) {
      throw new BadRequestException('validation failed' + error.message);
    }

    return Inputvalue;
  }
}
