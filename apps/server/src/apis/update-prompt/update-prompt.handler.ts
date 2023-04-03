import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
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
    // Only the user who created the prompt can update it.
    if (prompt.userId !== user.id) {
      throw new ForbiddenException(
        'You are not allowed to update this prompt.',
      );
    }
    prompt.setTitle(dto.title);
    prompt.setContent(dto.content);
    await this._promptRepository.save(prompt);
    return PromptDTO.fromEntity(prompt);
  }
}
