import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { Config } from 'src/config/config';

@Injectable()
export class AdminGuard implements CanActivate {
  @Inject()
  private readonly _configService: ConfigService<Config>;

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['x-admin-token'];
    if (token !== this._configService.getOrThrow('ADMIN_TOKEN')) {
      throw new ForbiddenException('Invalid admin token');
    }
    return true;
  }
}
