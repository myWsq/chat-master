import {
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserEntity } from '../aggregates/user/user.entity';
import { UserRepository } from '../aggregates/user/user.repository';

@Injectable()
export class AuthService {
  @Inject()
  private _userRepository: UserRepository;

  private _user: UserEntity;
  private _isAdmin = false;

  validateAdmin() {
    if (!this._isAdmin) {
      throw new ForbiddenException('You are not an admin.');
    }
  }

  getAuthorizedUser(): UserEntity {
    if (!this._user) {
      throw new UnauthorizedException('You are not logged in.');
    }
    return this._user;
  }

  async $setUser(apiKey: string) {
    const user = await this._userRepository.findByApiKey(apiKey);
    if (!user) {
      throw new UnauthorizedException('Invalid API key.');
    }
    this._user = user;
  }

  $markAsAdmin() {
    this._isAdmin = true;
  }
}
