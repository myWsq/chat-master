import { Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/common/admin.guard';
import { RegistrationDTO } from 'src/dto/registration.dto';
import { RegisterHandler } from './register.handler';

@Controller()
export class RegisterController {
  @Inject()
  private _registerHandler: RegisterHandler;

  @UseGuards(AdminGuard)
  @Post('register')
  async register(): Promise<RegistrationDTO> {
    return this._registerHandler.execute();
  }
}
