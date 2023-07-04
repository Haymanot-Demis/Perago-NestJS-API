import { IsNotEmpty, IsOptional, Length } from 'class-validator';
import { Role } from '../entities/role.entity';
import * as Joi from 'joi';

export class CreateRoleDto {
  @Length(2)
  name: string;

  @Length(2)
  @IsOptional()
  description?: string;
}

export const createRoleJoiSchema = Joi.object({
  name: Joi.string().min(2).required(),
  description: Joi.string().optional(),
  parent: Joi.optional(),
});
