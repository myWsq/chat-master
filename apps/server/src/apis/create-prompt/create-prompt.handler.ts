import { Inject, Injectable } from '@nestjs/common';
import { HandlerImpl } from '../../../utils/handler-impl';
import { PromptEntity } from '../../aggregates/prompt/prompt.entity';
import { PromptRepository } from '../../aggregates/prompt/prompt.repository';
import { PromptCreateDTO } from '../../dto/prompt-create.dto';
import { PromptDTO } from '../../dto/prompt.dto';
import { UserEntity } from '../../aggregates/user/user.entity';

@Injectable()
export class CreatePromptHandler implements HandlerImpl {
  @Inject()
  private _promptRepository: PromptRepository;

  async execute(dto: PromptCreateDTO, user: UserEntity): Promise<PromptDTO> {
    const prompt = PromptEntity.create({
      ...dto,
      user,
    });
    await this._promptRepository.save(prompt);
    return PromptDTO.fromEntity(prompt);
  }
}
