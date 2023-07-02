import { PartialType } from '@nestjs/swagger';
import { CreateRoleDto } from './create-role.dto';
import * as Joi from 'joi';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {}

export const updateRoleJoiSchema = Joi.object({
  name: Joi.string().length(2).required().optional(),
  description: Joi.string().optional(),
  parent: Joi.string().optional(),
});
