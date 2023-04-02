import { Inject } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { HandlerImpl } from '../../../utils/handler-impl';
import { AuthService } from '../../common/auth.service';
import { RegistrationDTO } from '../../dto/registration.dto';
import { RegisterDTO } from '../../dto/register.dto';

export class RegisterHandler implements HandlerImpl {
  @Inject()
  private _authService: AuthService;

  execute(dto: RegisterDTO): RegistrationDTO {
    const userId = randomUUID();
    const jwt = this._authService.signJwt(userId, dto.expiresIn);
    return new RegistrationDTO({
      userId,
      ...jwt,
    });
  }
}
