import { Body, Controller, Inject, Post } from '@nestjs/common';
import { MessageCreateDTO } from '../../dto/message-create.dto';
import { MessageDTO } from '../../dto/message.dto';
import { CreateMessageHandler } from './create-message.handler';
import { AuthService } from '../../common/auth.service';

@Controller()
export class CreateMessageController {
  @Inject()
  private _createMessageHandler: CreateMessageHandler;

  @Inject()
  private _authService: AuthService;

  @Post('/create-message')
  async createPrompt(@Body() body: MessageCreateDTO): Promise<MessageDTO> {
    const user = this._authService.getAuthorizedUser();
    return this._createMessageHandler.execute(body, user);
  }
}
