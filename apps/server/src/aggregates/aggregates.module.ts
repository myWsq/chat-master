import { Module } from '@nestjs/common';
import { PromptRepository } from './prompt/prompt.repository';

@Module({
  providers: [PromptRepository],
  exports: [PromptRepository],
})
export class AggregatesModule {}
