import { Controller, Inject, Post } from '@nestjs/common';
import { AuthService } from '../../common/auth.service';
import { RegistrationDTO } from '../../dto/registration.dto';
import { RegisterHandler } from './register.handler';

@Controller()
export class RegisterController {
  @Inject()
  private _registerHandler: RegisterHandler;

  @Inject()
  private _authService: AuthService;

  @Post('register')
  async register(): Promise<RegistrationDTO> {
    this._authService.validateAdmin();
    return this._registerHandler.execute();
  }
}
