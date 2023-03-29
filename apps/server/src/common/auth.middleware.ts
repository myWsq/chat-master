import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  @Inject()
  private _authService: AuthService;

  use(req: any, _res: any, next: any) {
    const adminToken = req.headers['x-admin-token'];
    const userToken = req.headers['authorization'];
    if (adminToken) {
      this._authService.$markAsAdmin();
    }
    if (userToken) {
      this._authService.$setUserId(userToken);
    }
    next();
  }
}
