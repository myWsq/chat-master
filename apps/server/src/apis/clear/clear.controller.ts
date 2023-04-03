import { Controller, Inject, Post } from '@nestjs/common';
import { ClearHandler } from './clear.handler';
import { AuthService } from '../../common/auth.service';

@Controller()
export class ClearController {
  @Inject()
  private _clearHandler: ClearHandler;

  @Inject()
  private _authService: AuthService;

  @Post('/clear')
  async clear() {
    this._authService.validateAdmin();
    await this._clearHandler.execute();
  }
}
