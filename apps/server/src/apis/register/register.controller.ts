import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AuthService } from '../../common/auth.service';
import { RegisterHandler } from './register.handler';
import { RegisterDTO } from '../../dto/register.dto';
import { UserDTO } from '../../dto/user.dto';

@Controller()
export class RegisterController {
  @Inject()
  private _registerHandler: RegisterHandler;

  @Inject()
  private _authService: AuthService;

  @Post('/register')
  async register(@Body() body: RegisterDTO): Promise<UserDTO> {
    this._authService.validateAdmin();
    return this._registerHandler.execute(body);
  }
}
