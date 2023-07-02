import {
  IsNotEmpty,
  IsAlpha,
  Length,
  IsEmail,
  IsString,
  IsNumberString,
  IsInt,
  IsOptional,
} from 'class-validator';
import { Employee } from '../entities/employee.entity';
import { calculateObjectSize } from 'typeorm/driver/mongodb/bson.typings';
import * as Joi from 'joi';
import { Photo } from 'src/photos/entities/photo.entity';

export class CreateEmployeeDTO {
  @IsNotEmpty()
  @IsAlpha()
  @Length(3, 20)
  firstname: string;

  @IsNotEmpty()
  @IsAlpha()
  @Length(3, 20)
  lastname: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  position: string;

  level: number;

  parentId: string;

  photos: Photo[];
}

export const createEmployeeJoiSchema = Joi.object({
  firstname: Joi.string().min(3).max(20).required(),
  lastname: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  position: Joi.string().required(),
  // parent: Joi.string(),
  level: Joi.number(),
});
