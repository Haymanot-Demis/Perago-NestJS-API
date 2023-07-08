import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmployeesService } from 'src/employees/employees.service';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC, ROLES_KEY, Roles } from '../app.constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private Jwtservice: JwtService,
    private empService: EmployeesService,
    private reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const token = this.extractTokenFromHeader(request);

    try {
      const payload = await this.Jwtservice.verifyAsync(token, {
        secret: new ConfigService().get('JWT_SECRET'),
      });
      console.log(payload);
      request['user'] = await this.empService.findEmployee(payload.sub);
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string {
    const authHeader = request.headers.authorization;
    console.log(request.headers);

    const [type, token] = authHeader?.split(' ') ?? [];

    return type === 'Bearer' && token ? token : undefined;
  }
}
