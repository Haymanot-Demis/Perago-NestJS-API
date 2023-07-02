import { IsNotEmpty, IsOptional, Length } from 'class-validator';
import { Role } from '../entities/role.entity';

export class CreateRoleDto {
  name: string;

  @IsOptional()
  description: string;

  @IsOptional()
  parent: Role;
}
