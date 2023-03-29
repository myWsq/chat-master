import { Inject } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { AuthService } from 'src/common/auth.service';
import { RegistrationDTO } from 'src/dto/registration.dto';
import { HandlerImpl } from 'utils/handler-impl';

export class RegisterHandler implements HandlerImpl {
  @Inject()
  private _authService: AuthService;

  execute(): RegistrationDTO {
    const userId = randomUUID();
    const jwt = this._authService.signJwt(userId);
    return new RegistrationDTO({
      userId,
      ...jwt,
    });
  }
}
