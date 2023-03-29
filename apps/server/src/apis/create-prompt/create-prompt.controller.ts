import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AuthService } from '../../common/auth.service';
import { PromptCreateDTO } from '../../dto/prompt-create.dto';
import { PromptDTO } from '../../dto/prompt.dto';
import { CreatePromptHandler } from './create-prompt.handler';

@Controller()
export class CreatePromptController {
  @Inject()
  private _createPromptHandler: CreatePromptHandler;

  @Inject()
  private _authService: AuthService;

  @Post('create-prompt')
  async createPrompt(@Body() body: PromptCreateDTO): Promise<PromptDTO> {
    const userId = this._authService.getUserId();
    return this._createPromptHandler.execute(body, userId);
  }
}
