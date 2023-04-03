import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  @Inject()
  private _authService: AuthService;

  async use(req: any, _res: any, next: any) {
    const adminToken = req.headers['x-admin-token'];
    const apiKey = req.headers['x-api-key'];
    if (adminToken) {
      this._authService.$markAsAdmin();
    }
    if (apiKey) {
      await this._authService.$setUser(apiKey);
    }
    next();
  }
}
