import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log('Here Request in Auth Guards ==> ', request.headers);
    if (
      request.headers.authorization &&
      request.headers.authorization.startsWith('Bearer')
    ) {
      return true;
    }
    return false;
    // return validateRequest(request);
  }
}
