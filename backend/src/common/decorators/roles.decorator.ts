import { SetMetadata } from '@nestjs/common';
export type UserRole = 'user' | 'admin' | 'super_admin';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: ('user' | 'admin' | 'super_admin')[]) =>
  SetMetadata(ROLES_KEY, roles);
