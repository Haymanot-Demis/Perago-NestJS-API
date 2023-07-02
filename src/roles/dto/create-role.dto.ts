import { IsNotEmpty, IsOptional, Length } from 'class-validator';
import { Role } from '../entities/role.entity';
import * as Joi from 'joi';

export class CreateRoleDto {
  name: string;

  @IsOptional()
  description: string;

  @IsOptional()
  parent: Role;
}

export const createRoleJoiSchema = Joi.object({
  name: Joi.string().length(2).required(),
  description: Joi.string().optional(),
  parent: Joi.string().optional(),
});
