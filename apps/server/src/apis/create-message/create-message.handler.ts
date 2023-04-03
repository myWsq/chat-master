import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { HandlerImpl } from '../../../utils/handler-impl';
import { MessageRepository } from '../../aggregates/message/message.repository';
import { UserEntity } from '../../aggregates/user/user.entity';
import { MessageDTO } from '../../dto/message.dto';
import { MessageCreateDTO } from '../../dto/message-create.dto';
import { MessageEntity } from '../../aggregates/message/message.entity';
import { SessionRepository } from '../../aggregates/session/session.repository';
import { SessionEntity } from '../../aggregates/session/session.entity';
import { PromptRepository } from '../../aggregates/prompt/prompt.repository';

@Injectable()
export class CreateMessageHandler implements HandlerImpl {
  @Inject()
  private _messageRepository: MessageRepository;
  @Inject()
  private _sessionRepository: SessionRepository;
  @Inject()
  private _promptRepository: PromptRepository;

  async execute(dto: MessageCreateDTO, user: UserEntity): Promise<MessageDTO> {
    const prompt = await this._promptRepository.load(dto.promptId);
    // If the message is the first message in the session, create a new session.
    const session = dto.sessionId
      ? await this._sessionRepository.load(dto.sessionId)
      : SessionEntity.create({ prompt });

    // Only the user who created the prompt can create messages for it.
    if (prompt.userId !== user.id || session.promptId !== prompt.id) {
      throw new ForbiddenException(
        'You are not allowed to create messages for this prompt.',
      );
    }

    const message = MessageEntity.create({
      role: 'user',
      content: dto.content,
      session,
    });

    await this._sessionRepository.save(session);
    await this._messageRepository.save(message);
    return MessageDTO.fromEntity(message);
  }
}
