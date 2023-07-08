import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC, true);
export const ROLES_KEY = 'roles';
export enum Roles {
  HR = 'HR',
}
export const RoleDecorator = (...roles: Roles[]) =>
  SetMetadata(ROLES_KEY, roles);
