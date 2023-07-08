import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY, Roles } from '../app.constants';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndMerge<Roles[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (requiredRoles.length == 0) {
      return true;
    }
    console.log('requiredRoles', requiredRoles);

    const user = context.switchToHttp().getRequest().user;

    console.log(user);

    return requiredRoles.some((role) => user.position.name == role);
  }
}
