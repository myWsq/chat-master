import { HandlerImpl } from 'utils/handler-impl';
import { sign } from 'jsonwebtoken';
import { UserEntity } from 'src/aggregates/user/user.entity';
import { Inject } from '@nestjs/common';
import { Config } from 'src/config/config';
import { ConfigService } from '@nestjs/config';
import { RegistrationDTO } from 'src/dto/registration.dto';

export class RegisterHandler implements HandlerImpl {
  @Inject()
  private _configService: ConfigService<Config>;

  execute(): RegistrationDTO {
    const user = UserEntity.create();
    const expiresIn = 30 * 24 * 3600;
    const token = sign(
      { id: user.id },
      this._configService.getOrThrow('JWT_SECRET_KEY'),
      {
        expiresIn,
      },
    );
    return {
      userId: user.id,
      jwt: token,
      expiredAt: new Date(Date.now() + expiresIn * 1000),
    };
  }
}
