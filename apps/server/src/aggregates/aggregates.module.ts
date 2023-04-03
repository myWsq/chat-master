import { Module } from '@nestjs/common';
import { PromptRepository } from './prompt/prompt.repository';
import { UserRepository } from './user/user.repository';

@Module({
  providers: [PromptRepository, UserRepository],
  exports: [PromptRepository, UserRepository],
})
export class AggregatesModule {}
