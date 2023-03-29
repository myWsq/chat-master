import { Inject, Injectable } from '@nestjs/common';
import { PromptEntity } from 'src/aggregates/prompt/prompt.entity';
import { PromptRepository } from 'src/aggregates/prompt/prompt.repository';
import { PromptCreateDTO } from 'src/dto/prompt-create.dto';
import { PromptDTO } from 'src/dto/prompt.dto';
import { HandlerImpl } from 'utils/handler-impl';

@Injectable()
export class CreatePromptHandler implements HandlerImpl {
  @Inject()
  private _promptRepository: PromptRepository;

  async execute(dto: PromptCreateDTO, userId: string): Promise<PromptDTO> {
    const prompt = PromptEntity.create({
      ...dto,
      userId,
    });
    await this._promptRepository.save(prompt);
    return new PromptDTO(prompt);
  }
}
