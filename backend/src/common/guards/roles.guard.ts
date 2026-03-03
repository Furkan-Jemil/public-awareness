import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true; // No roles restricted
    }

    const { user } = context.switchToHttp().getRequest();

    // The user object must be attached by the JwtAuthGuard before this runs
    if (!user || !user.role) {
      throw new ForbiddenException('User role is missing or unauthorized');
    }

    const hasRole = requiredRoles.some((role) => user.role === role);

    if (!hasRole) {
      throw new ForbiddenException(
        `Access forbidden. Required roles: ${requiredRoles.join(', ')}`,
      );
    }

    return true;
  }
}
