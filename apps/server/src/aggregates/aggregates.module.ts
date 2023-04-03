import { Module } from '@nestjs/common';
import { PromptRepository } from './prompt/prompt.repository';
import { UserRepository } from './user/user.repository';
import { SessionRepository } from './session/session.repository';
import { MessageRepository } from './message/message.repository';

@Module({
  providers: [
    PromptRepository,
    UserRepository,
    SessionRepository,
    MessageRepository,
  ],
  exports: [
    PromptRepository,
    UserRepository,
    SessionRepository,
    MessageRepository,
  ],
})
export class AggregatesModule {}
