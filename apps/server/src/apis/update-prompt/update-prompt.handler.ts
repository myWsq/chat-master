import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { HandlerImpl } from '../../../utils/handler-impl';
import { PromptRepository } from '../../aggregates/prompt/prompt.repository';
import { PromptDTO } from '../../dto/prompt.dto';
import { PromptUpdateDTO } from '../../dto/prompt-update.dto';

@Injectable()
export class UpdatePromptHandler implements HandlerImpl {
  @Inject()
  private _promptRepository: PromptRepository;

  async execute(dto: PromptUpdateDTO, userId: string): Promise<PromptDTO> {
    const prompt = await this._promptRepository.load(dto.id);
    if (prompt.userId !== userId) {
      throw new ForbiddenException('You are not the owner of this prompt');
    }
    prompt.setTitle(dto.title);
    prompt.setContent(dto.content);
    await this._promptRepository.save(prompt);
    return PromptDTO.fromEntity(prompt);
  }
}
