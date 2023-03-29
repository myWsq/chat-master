import { Module } from '@nestjs/common';
import { AggregatesModule } from 'src/aggregates/aggregates.module';
import { CreatePromptController } from './create-prompt/create-prompt.controller';
import { CreatePromptHandler } from './create-prompt/create-prompt.handler';
import { RegisterController } from './register/register.controller';
import { RegisterHandler } from './register/register.handler';

@Module({
  imports: [AggregatesModule],
  controllers: [RegisterController, CreatePromptController],
  providers: [RegisterHandler, CreatePromptHandler],
})
export class ApisModule {}
