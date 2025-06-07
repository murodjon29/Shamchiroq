import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Role } from 'src/enum';
import { handleError } from 'src/helpers/responseError';

@Injectable()
export class SelfGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const { user, params } = context.switchToHttp().getRequest();
      if (user.role === Role.SUPERADMIN || params.id == user.id) {
        return true;
      }
      throw new ForbiddenException('Forbidden user');
    } catch (error) {
      return handleError(error);
    }
  }
}
