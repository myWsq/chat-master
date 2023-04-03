import { Module } from '@nestjs/common';
import { AggregatesModule } from '../aggregates/aggregates.module';
import { CreatePromptController } from './create-prompt/create-prompt.controller';
import { CreatePromptHandler } from './create-prompt/create-prompt.handler';
import { RegisterController } from './register/register.controller';
import { RegisterHandler } from './register/register.handler';
import { UpdatePromptController } from './update-prompt/update-prompt.controller';
import { UpdatePromptHandler } from './update-prompt/update-prompt.handler';
import { ClearController } from './clear/clear.controller';
import { ClearHandler } from './clear/clear.handler';

@Module({
  imports: [AggregatesModule],
  controllers: [
    ClearController,
    RegisterController,
    CreatePromptController,
    UpdatePromptController,
  ],
  providers: [
    ClearHandler,
    RegisterHandler,
    CreatePromptHandler,
    UpdatePromptHandler,
  ],
})
export class ApisModule {}
