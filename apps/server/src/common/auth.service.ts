import {
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { verify, sign } from 'jsonwebtoken';
import { z } from 'zod';
import { Config } from '../config/config';

const JwtPayloadSchema = z.object({
  id: z.string(),
});

@Injectable()
export class AuthService {
  @Inject()
  private _configService: ConfigService<Config>;
  private _userId: string;
  private _isAdmin = false;

  validateAdmin() {
    if (!this._isAdmin) {
      throw new ForbiddenException('You are not an admin.');
    }
  }

  getUserId(): string {
    if (!this._userId) {
      throw new UnauthorizedException('You are not logged in.');
    }
    return this._userId;
  }

  signJwt(userId: string) {
    const expiresIn = 30 * 24 * 3600;
    const token = sign(
      { id: userId },
      this._configService.getOrThrow('JWT_SECRET_KEY'),
      {
        expiresIn,
      },
    );
    const expiredAt = new Date(Date.now() + expiresIn * 1000);
    return { token, expiredAt };
  }

  $setUserId(jwt: string) {
    try {
      const payload = verify(
        jwt,
        this._configService.getOrThrow('JWT_SECRET_KEY'),
      );
      const { id } = JwtPayloadSchema.parse(payload);
      this._userId = id;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  $markAsAdmin() {
    this._isAdmin = true;
  }
}
