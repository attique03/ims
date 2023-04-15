import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    console.log('Roles ===>>> ', roles);

    function matchRoles(roles: string[], loggedInRole: string[]) {
      if (roles === loggedInRole) {
        return true;
      }
      //   return false;
      throw new UnauthorizedException();
      //   return roles === loggedInRole ? true : false;
    }

    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    console.log('User ==> ', user.role.role);

    const test = matchRoles(roles, user.role.role);
    console.log('testing ', test);

    return matchRoles(roles, user.role.role);
  }
}
