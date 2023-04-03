import { Inject, Injectable } from '@nestjs/common';
import { HandlerImpl } from '../../../utils/handler-impl';
import { RegisterDTO } from '../../dto/register.dto';
import { UserRepository } from '../../aggregates/user/user.repository';
import { UserEntity } from '../../aggregates/user/user.entity';
import { UserDTO } from '../../dto/user.dto';

@Injectable()
export class RegisterHandler implements HandlerImpl {
  @Inject()
  private _userRepository: UserRepository;

  async execute(dto: RegisterDTO): Promise<UserDTO> {
    const user = UserEntity.create(dto);
    await this._userRepository.save(user);
    return UserDTO.fromEntity(user);
  }
}
