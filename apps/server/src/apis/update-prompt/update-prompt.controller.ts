import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AuthService } from '../../common/auth.service';
import { PromptDTO } from '../../dto/prompt.dto';
import { UpdatePromptHandler } from './update-prompt.handler';
import { PromptUpdateDTO } from '../../dto/prompt-update.dto';

@Controller()
export class UpdatePromptController {
  @Inject()
  private _updatePromptHandler: UpdatePromptHandler;

  @Inject()
  private _authService: AuthService;

  @Post('update-prompt')
  async updatePrompt(@Body() body: PromptUpdateDTO): Promise<PromptDTO> {
    const userId = this._authService.getUserId();
    return this._updatePromptHandler.execute(body, userId);
  }
}
