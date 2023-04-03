import { Inject, Injectable } from '@nestjs/common';
import { HandlerImpl } from '../../../utils/handler-impl';
import { PromptRepository } from '../../aggregates/prompt/prompt.repository';
import { PromptDTO } from '../../dto/prompt.dto';
import { PromptUpdateDTO } from '../../dto/prompt-update.dto';
import { UserEntity } from '../../aggregates/user/user.entity';

@Injectable()
export class UpdatePromptHandler implements HandlerImpl {
  @Inject()
  private _promptRepository: PromptRepository;

  async execute(dto: PromptUpdateDTO, user: UserEntity): Promise<PromptDTO> {
    const prompt = await this._promptRepository.load(dto.id);
    prompt.setTitle(dto.title, user);
    prompt.setContent(dto.content, user);
    await this._promptRepository.save(prompt);
    return PromptDTO.fromEntity(prompt);
  }
}
