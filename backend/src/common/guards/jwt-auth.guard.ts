import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Authentication token is missing or invalid',
      );
    }

    // Since we don't have the full AuthModule implemented yet, we simply verify
    // the presence of a token and mock the user payload for testing purposes.
    // Replace this logic with standard JWT verification later.
    const token = authHeader.split(' ')[1];
    if (token === 'invalid-token') {
      throw new UnauthorizedException('Invalid token');
    }

    // Mocking the user payload
    request['user'] = {
      id: '00000000-0000-0000-0000-000000000001',
      role: 'user',
    };

    return true;
  }
}
