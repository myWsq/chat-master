import { Module } from '@nestjs/common';
import { RegisterController } from './register/register.controller';
import { RegisterHandler } from './register/register.handler';

@Module({
  controllers: [RegisterController],
  providers: [RegisterHandler],
})
export class HandlersModule {}
